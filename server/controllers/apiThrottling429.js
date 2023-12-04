// An example script consuming an API with various throttling and 429 error
// handling strategies.
//
// Blog post with more context
// https://www.useanvil.com/blog/2021-03-29-throttling-and-consuming-apis-with-429-rate-limits
//
// License: MIT

import fetch from 'node-fetch'
import mapLimit from 'async/mapLimit'
import asyncify from 'async/asyncify'
import { RateLimiter } from 'limiter'

import { performance } from 'perf_hooks'

// The API's limits e.g. 6 requests over 3 seconds

const maxRequests = 6
const maxRequestWindowMS = 3000
const msBetweenRequests = maxRequestWindowMS / maxRequests
const numRequests = 10

// The call to your API

async function callTheAPI (reqIndex, attempt = 0) {
  const start = performance.now()
  console.log('Request Start:', reqIndex, `attempt:${attempt}`, new Date().toISOString())

  // Add your API info here!
  const apiURL = 'YOUR URL'
  const json = {}
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `AUTH TO THE API`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  }
  const response = await fetch(apiURL, requestOptions)

  console.log('Request End:  ', reqIndex, `attempt:${attempt}`, response.status, getTimeMSString(start))
  return response
}

// Main function

let totals = {}

async function main () {
  await runBenchmark('Sleep between requests, no retry', numRequests, benchmarkSerialWithSleepNoRetry)
  await runBenchmark('Serial with no limits', numRequests, benchmarkSerialNoLimits)
  await runBenchmark('Parallel with no limits', numRequests, benchmarkParallelNoLimits)
  await runBenchmark('Parallel with sleep', numRequests, benchmarkParallelWithSleep)
  await runBenchmark('Parallel with `async.mapLimit`', numRequests, benchmarkParallelMapLimit)
  await runBenchmark('Parallel with a token bucket', numRequests, benchmarkParallelTokenBucket)
  await runBenchmark('Parallel with `limiter` Library', numRequests, benchmarkParallelLimiterLibrary, false)

  console.log('\nBenchmark Totals in ms')
  console.log(totals)
}

async function runBenchmark (name, numRequests, fn, shouldSleep = true) {
  console.log('\n---------------------------\n')
  console.log('⏱️  Running Benchmark', name)
  const start = performance.now()
  await fn(numRequests)
  const timeMS = Math.round(performance.now() - start)
  console.log(`✅ Total ${name}: ${timeMS}ms`)
  totals[name] = timeMS
  if (shouldSleep) {
    await sleep(maxRequestWindowMS)
  }
}

// Benchmark funcs

async function benchmarkParallelNoLimits (total) {
  const promises = getArrayOfLength(total).map(async (index) => {
    return fetchAndRetryIfNecessary((attempt = 0) => callTheAPI(index, attempt), 0, index)
  })
  return Promise.all(promises)
}

async function benchmarkParallelMapLimit (total) {
  return mapLimit(getArrayOfLength(total), maxRequests, asyncify((index) => (
    fetchAndRetryIfNecessary((attempt = 0) => callTheAPI(index, attempt), 0, index)
  )))
}

async function benchmarkSerialWithSleepNoRetry (total) {
  for (let index = 0; index < total; index++) {
    await callTheAPI(index)
    await sleep(msBetweenRequests)
  }
}

async function benchmarkSerialNoLimits (total) {
  for (let index = 0; index < total; index++) {
    await fetchAndRetryIfNecessary((attempt = 0) => callTheAPI(index, attempt), 0, index)
  }
}

async function benchmarkParallelWithSleep (total) {
  const promises = []
  for (let index = 0; index < total; index++) {
    promises.push(fetchAndRetryIfNecessary((attempt = 0) => callTheAPI(index, attempt), 0, index))
    await sleep(msBetweenRequests / 2)
  }
  return Promise.all(promises)
}

async function benchmarkParallelTokenBucket (total) {
  const tokenBucket = new TokenBucketRateLimiter({ maxRequests, maxRequestWindowMS })
  const promises = getArrayOfLength(total).map(async (index) => (
    fetchAndRetryIfNecessary(async (attempt = 0) => (
      tokenBucket.acquireToken(() => callTheAPI(index, attempt))
    ), 0, index)
  ))
  return Promise.all(promises)
}

async function benchmarkParallelLimiterLibrary (total) {
  const tokenBucket = new LimiterLibraryRateLimiter({ maxRequests, maxRequestWindowMS })
  const promises = getArrayOfLength(total).map(async (index) => (
    fetchAndRetryIfNecessary(async (attempt = 0) => (
      tokenBucket.acquireToken(() => callTheAPI(index, attempt))
    ), 0, index)
  ))
  return Promise.all(promises)
}

// Ratelimit helpers

class TokenBucketRateLimiter {
  constructor ({ maxRequests, maxRequestWindowMS }) {
    this.maxRequests = maxRequests
    this.maxRequestWindowMS = maxRequestWindowMS
    this.reset()
  }

  reset () {
    this.count = 0
    this.resetTimeout = null
  }

  scheduleReset () {
    if (!this.resetTimeout) {
      this.resetTimeout = setTimeout(() => this.reset(), this.maxRequestWindowMS)
    }
  }

  async acquireToken (fn) {
    if (this.count === this.maxRequests) {
      await nextTick()
      this.scheduleReset()
      await sleep(this.maxRequestWindowMS)
      return this.acquireToken(fn)
    }

    this.count = this.count + 1
    await nextTick()
    return fn()
  }
}

class LimiterLibraryRateLimiter {
  constructor ({ maxRequests, maxRequestWindowMS }) {
    this.maxRequests = maxRequests
    this.maxRequestWindowMS = maxRequestWindowMS
    this.limiter = new RateLimiter(this.maxRequests, this.maxRequestWindowMS, false)
  }

  async acquireToken (fn) {
    if (this.limiter.tryRemoveTokens(1)) {
      await nextTick()
      return fn()
    } else {
      await sleep(this.maxRequestWindowMS)
      return this.acquireToken(fn)
    }
  }
}

async function fetchAndRetryIfNecessary (callAPI, attempt = 0, index) {
  const response = await callAPI(attempt)
  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after')
    const millisToSleep = getMillisToSleep(retryAfter)
    console.log('❗ Retrying:  ', index, `attempt:${attempt + 1}`, 'at', retryAfter, 'sleep for', millisToSleep, 'ms')
    await sleep(millisToSleep)
    return fetchAndRetryIfNecessary(callAPI, attempt + 1, index)
  }
  return response
}

function getMillisToSleep (retryHeaderString) {
  let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000)
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(retryHeaderString) - new Date())
  }
  return millisToSleep
}

// General Helpers

function sleep (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function nextTick () {
  return sleep(0)
}

function getArrayOfLength (length) {
  return Array.from(Array(length).keys())
}

function getTimeMSString (start) {
  return `${Math.round(performance.now() - start)}ms`
}

main().then(() => {
  process.exit(0)
}).catch((err) => {
  console.log(err.stack || err.message)
  process.exit(1)
})