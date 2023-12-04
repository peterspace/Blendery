
//source: https://www.useanvil.com/blog/engineering/throttling-and-consuming-apis-with-429-rate-limits/



//========================{success state}===========================================================
{
    fullResponse: {
      status: 200,
      statusText: 'OK',
      headers: Object [AxiosHeaders] {
        date: 'Thu, 30 Nov 2023 01:39:05 GMT',
        'content-type': 'application/json; charset=utf-8',
        'transfer-encoding': 'chunked',
        connection: 'close',
        'x-frame-options': 'SAMEORIGIN',
        'x-xss-protection': '0',
        'x-content-type-options': 'nosniff',
        'x-download-options': 'noopen',
        'x-permitted-cross-domain-policies': 'none',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'cache-control': 'max-age=30, public, must-revalidate, s-maxage=30',
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, PUT, DELETE, GET, OPTIONS',
        'access-control-request-method': '*',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'access-control-expose-headers': 'link, per-page, total',
        vary: 'Accept-Encoding, Origin',
        etag: 'W/"95be233235f9462a6e6d3cdc53ba03bc"',
        'x-request-id': 'e2d46ac5-ea74-420a-98df-2cfc43a4b0e0',
        'x-runtime': '0.067196',
        'alternate-protocol': '443:npn-spdy/2',
        'strict-transport-security': 'max-age=15724800; includeSubdomains',
        'cf-cache-status': 'HIT',
        age: '27',
        'set-cookie': [Array],
        server: 'cloudflare',
        'cf-ray': '82df5fe8fe009d8a-DME'
      },
      config: {
        transitional: [Object],
        adapter: [Array],
        transformRequest: [Array],
        transformResponse: [Array],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: [Object],
        validateStatus: [Function: validateStatus],
        headers: [Object [AxiosHeaders]],
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        data: undefined
      },
      request: ClientRequest {
        _events: [Object: null prototype],
        _eventsCount: 7,
        _maxListeners: undefined,
        outputData: [],
        outputSize: 0,
        writable: true,
        destroyed: true,
        _last: true,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        maxRequestsOnConnectionReached: false,
        _defaultKeepAlive: true,
        useChunkedEncodingByDefault: false,
        sendDate: false,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: 0,
        _hasBody: true,
        _trailer: '',
        finished: true,
        _headerSent: true,
        _closed: true,
        socket: [TLSSocket],
        _header: 'GET /api/v3/coins/bitcoin HTTP/1.1\r\n' +
          'Accept: application/json, text/plain, */*\r\n' +
          'User-Agent: axios/1.6.2\r\n' +
          'Accept-Encoding: gzip, compress, deflate, br\r\n' +
          'Host: api.coingecko.com\r\n' +
          'Connection: close\r\n' +
          '\r\n',
        _keepAliveTimeout: 0,
        _onPendingData: [Function: nop],
        agent: [Agent],
        socketPath: undefined,
        method: 'GET',
        maxHeaderSize: undefined,
        insecureHTTPParser: undefined,
        path: '/api/v3/coins/bitcoin',
        _ended: true,
        res: [IncomingMessage],
        aborted: false,
        timeoutCb: null,
        upgradeOrConnect: false,
        parser: null,
        maxHeadersCount: null,
        reusedSocket: false,
        host: 'api.coingecko.com',
        protocol: 'https:',
        _redirectable: [Writable],
        [Symbol(kCapture)]: false,
        [Symbol(kNeedDrain)]: false,
        [Symbol(corked)]: 0,
        [Symbol(kOutHeaders)]: [Object: null prototype]
      },
      data: {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        web_slug: 'bitcoin',
        asset_platform_id: null,
        platforms: [Object],
        detail_platforms: [Object],
        block_time_in_minutes: 10,
        hashing_algorithm: 'SHA-256',
        categories: [Array],
        preview_listing: false,
        public_notice: null,
        additional_notices: [],
        localization: [Object],
        description: [Object],
        links: [Object],
        image: [Object],
        country_origin: '',
        genesis_date: '2009-01-03',
        sentiment_votes_up_percentage: 83.03,
        sentiment_votes_down_percentage: 16.97,
        watchlist_portfolio_users: 1382765,
        market_cap_rank: 1,
        coingecko_rank: 1,
        coingecko_score: 83.151,
        developer_score: 99.241,
        community_score: 83.341,
        liquidity_score: 100.011,
        public_interest_score: 0.073,
        market_data: [Object],
        community_data: [Object],
        developer_data: [Object],
        public_interest_stats: [Object],
        status_updates: [],
        last_updated: '2023-11-30T01:38:13.891Z',
        tickers: [Array]
      }
    }
  }


//=============={Error state 429}=================================================================
const mainInfo = {
    status: 429, //=================={most important}=========================================
    statusText: 'Too Many Requests',
    headers: Object [AxiosHeaders] {
      date: 'Thu, 30 Nov 2023 00:52:55 GMT', //Mon, 29 Mar 2021 04:58:00 GMT also givein in ISO date format
      'content-type': 'application/json',
      'content-length': '187',
      connection: 'close',
      'retry-after': '60', //=================={most important: retry after 60 seconds or 1 minute}=========================================
      'set-cookie': [
        '__cf_bm=TyQSEBv7FFIWACgKjVYOpqDSV3rE9DbZVQklgtIQCSE-1701305575-0-AZBFvBu+dWKYKBAhSe/z9FpIWAE3Nj9OcH8cG+1G7VY4tVN+mPtiakFQQXmgRXFixkbQwUk3KRBtJYNtd4iaoaY=; path=/; expires=Thu, 30-Nov-23 01:22:55 GMT; domain=.api.coingecko.com; HttpOnly; Secure; SameSite=None'
      ],
      vary: 'Accept-Encoding',
      server: 'cloudflare',
      'cf-ray': '82df1c46bb9d3a65-DME'
    },
}






// const error429 = [
 
//     response: {
//         status: 429,
//         statusText: 'Too Many Requests',
//         headers: Object [AxiosHeaders] {
//           date: 'Thu, 30 Nov 2023 00:52:55 GMT',
//           'content-type': 'application/json',
//           'content-length': '187',
//           connection: 'close',
//           'retry-after': '60',
//           'set-cookie': [
//             '__cf_bm=TyQSEBv7FFIWACgKjVYOpqDSV3rE9DbZVQklgtIQCSE-1701305575-0-AZBFvBu+dWKYKBAhSe/z9FpIWAE3Nj9OcH8cG+1G7VY4tVN+mPtiakFQQXmgRXFixkbQwUk3KRBtJYNtd4iaoaY=; path=/; expires=Thu, 30-Nov-23 01:22:55 GMT; domain=.api.coingecko.com; HttpOnly; Secure; SameSite=None'
//           ],
//           vary: 'Accept-Encoding',
//           server: 'cloudflare',
//           'cf-ray': '82df1c46bb9d3a65-DME'
//         },
//         config: {
//           transitional: {
//             silentJSONParsing: true,
//             forcedJSONParsing: true,
//             clarifyTimeoutError: false
//           },
//           adapter: [ 'xhr', 'http' ],
//           transformRequest: [ [Function: transformRequest] ],
//           transformResponse: [ [Function: transformResponse] ],
//           timeout: 0,
//           xsrfCookieName: 'XSRF-TOKEN',
//           xsrfHeaderName: 'X-XSRF-TOKEN',
//           maxContentLength: -1,
//           maxBodyLength: -1,
//           env: {
//             FormData: [Function: FormData] {
//               LINE_BREAK: '\r\n',
//               DEFAULT_CONTENT_TYPE: 'application/octet-stream'
//             },
//             Blob: null
//           },
//           validateStatus: [Function: validateStatus],
//           headers: Object [AxiosHeaders] {
//             Accept: 'application/json, text/plain, */*',
//             'Content-Type': undefined,
//             'User-Agent': 'axios/1.6.2',
//             'Accept-Encoding': 'gzip, compress, deflate, br'
//           },
//           method: 'get',
//           url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
//           data: undefined
//         },
//         request: <ref *2> ClientRequest {
//           _events: [Object: null prototype] {
//             abort: [Function (anonymous)],
//             aborted: [Function (anonymous)],
//             connect: [Function (anonymous)],
//             error: [Function (anonymous)],
//             socket: [Function (anonymous)],
//             timeout: [Function (anonymous)],
//             prefinish: [Function: requestOnPrefinish]
//           },
        
//           _header: 'GET /api/v3/coins/bitcoin HTTP/1.1\r\n' +
//             'Accept: application/json, text/plain, */*\r\n' +
//             'User-Agent: axios/1.6.2\r\n' +
//             'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//             'Host: api.coingecko.com\r\n' +
//             'Connection: close\r\n' +
//             '\r\n',
//           _keepAliveTimeout: 0,
//           _onPendingData: [Function: nop],
//           agent: Agent {
//             _events: [Object: null prototype] {
//               free: [Function (anonymous)],
//               newListener: [Function: maybeEnableKeylog]
//             },
//             _eventsCount: 2,
//             _maxListeners: undefined,
//             defaultPort: 443,
//             protocol: 'https:',
//             options: [Object: null prototype] { path: null },
//             requests: [Object: null prototype] {},
//             sockets: [Object: null prototype] {
//               'api.coingecko.com:443:::::::::::::::::::::': [ [TLSSocket] ]
//             },
//             freeSockets: [Object: null prototype] {},
//             keepAliveMsecs: 1000,
//             keepAlive: false,
//             maxSockets: Infinity,
//             maxFreeSockets: 256,
//             scheduling: 'lifo',
//             maxTotalSockets: Infinity,
//             totalSocketCount: 1,
//             maxCachedSessions: 100,
//             _sessionCache: {
//               map: {
//                 'api.coingecko.com:443:::::::::::::::::::::': [Buffer [Uint8Array]]
//               },
//               list: [ 'api.coingecko.com:443:::::::::::::::::::::' ]
//             },
//             [Symbol(kCapture)]: false
//           },
//           socketPath: undefined,
//           method: 'GET',
//           maxHeaderSize: undefined,
//           insecureHTTPParser: undefined,
//           path: '/api/v3/coins/bitcoin',
//           _ended: true,
//           [Symbol(kCapture)]: false,
//           [Symbol(kNeedDrain)]: false,
//           [Symbol(corked)]: 0,
//           [Symbol(kOutHeaders)]: [Object: null prototype] {
//             accept: [ 'Accept', 'application/json, text/plain, */*' ],
//             'user-agent': [ 'User-Agent', 'axios/1.6.2' ],
//             'accept-encoding': [ 'Accept-Encoding', 'gzip, compress, deflate, br' ],
//             host: [ 'Host', 'api.coingecko.com' ]
//           }
//         },
//         data: {
//           status: {
//             error_code: 429,
//             error_message: "You've exceeded the Rate Limit. Please visit https://www.coingecko.com/en/api/pricing to subscribe to our API plans for higher rate limits."
//           }
//         }
//       }
    
// ]
