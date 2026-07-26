const http = require('http');
const https = require('https');
const { URL } = require('url');

function request(input, callback) {
  const options = typeof input === 'string' ? { url: input } : { ...input };
  const target = new URL(options.url || options.uri);
  const client = target.protocol === 'https:' ? https : http;
  const method = (options.method || 'GET').toUpperCase();
  const headers = { ...(options.headers || {}) };
  let body = options.body;

  if (options.json && body && typeof body === 'object') {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(body);
  } else if (options.json && body === undefined && options.body && typeof options.body === 'object') {
    body = JSON.stringify(options.body);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(body);
  } else if (options.json && options.body && typeof options.body !== 'string') {
    body = JSON.stringify(options.body);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(body);
  }

  const requestOptions = {
    hostname: target.hostname,
    port: target.port || (target.protocol === 'https:' ? 443 : 80),
    path: `${target.pathname}${target.search}`,
    method,
    headers,
  };

  const req = client.request(requestOptions, (res) => {
    const chunks = [];
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('end', () => {
      const responseBody = Buffer.concat(chunks).toString();
      callback(null, res, responseBody);
    });
  });

  req.on('error', (error) => callback(error));

  if (body !== undefined) {
    req.write(body);
  }

  req.end();
}

module.exports = request;