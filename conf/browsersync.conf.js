const conf = require('./gulp.conf');
const url = require('url');
const proxy = require('proxy-middleware');

module.exports = function () {
  var proxyOptions = url.parse('http://185.76.104.110:8080/api');
  proxyOptions.route = '/api';
  proxyOptions.headers = {
    'API_KEY': 'AISm6RYcuCEKRPByxPHaEX%2fBBnSm%2bdEu6BCK5Ol5IMk%3d'
  };

  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [proxy(proxyOptions)]
    },
    open: false
  };
};
