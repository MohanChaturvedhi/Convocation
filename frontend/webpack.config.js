const webpack = require('webpack');
const path = require('path');

module.exports = {
  // ... other webpack configuration ...
  devServer: {
    setupMiddlewares(middlewares, server) {
      middlewares.push(function(req, res, next) {
        console.log('This is a custom middleware!');
        next();
      });

      // Don't forget to return the modified middlewares array!
      return middlewares;
    },
  },
};