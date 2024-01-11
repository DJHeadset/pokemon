const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://users:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/pokemon',
    createProxyMiddleware({
      target: 'http://battle:5001',
      changeOrigin: true,
    })
  );
};
