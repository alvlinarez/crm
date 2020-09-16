//require('ignore-styles');
require('@babel/polyfill'); // Para async y await

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

require('./server');
