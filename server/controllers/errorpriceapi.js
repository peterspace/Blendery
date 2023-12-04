//Server Running on port 4000


{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      url: 'https://api.coingecko.com/api/v3/coins/tether',
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
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
      _closed: false,
      socket: [TLSSocket],
      _header: 'GET /api/v3/coins/tether HTTP/1.1\r\n' +
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
      path: '/api/v3/coins/tether',
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      destroyed: false,
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
      _closed: false,
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      url: 'https://api.coingecko.com/api/v3/coins/tether',
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
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
      _closed: false,
      socket: [TLSSocket],
      _header: 'GET /api/v3/coins/tether HTTP/1.1\r\n' +
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
      path: '/api/v3/coins/tether',
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      destroyed: false,
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
      _closed: false,
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      url: 'https://api.coingecko.com/api/v3/coins/tether',
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
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
      _closed: false,
      socket: [TLSSocket],
      _header: 'GET /api/v3/coins/tether HTTP/1.1\r\n' +
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
      path: '/api/v3/coins/tether',
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      destroyed: false,
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
      _closed: false,
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}
{
  coingekoErrorMsg: AxiosError: Request failed with status code 429
      at settle (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:1967:12)
      at IncomingMessage.handleStreamEnd (/Users/peterio/Downloads/blendery_develop/server/node_modules/axios/dist/node/axios.cjs:3062:11)
      at IncomingMessage.emit (node:events:532:35)
      at endReadableNT (node:internal/streams/readable:1346:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    code: 'ERR_BAD_REQUEST',
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
      url: 'https://api.coingecko.com/api/v3/coins/tether',
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
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
      _closed: false,
      socket: [TLSSocket],
      _header: 'GET /api/v3/coins/tether HTTP/1.1\r\n' +
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
      path: '/api/v3/coins/tether',
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
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    }
  }
}


//7 failed request in 4 successfull requests