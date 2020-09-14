const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = require('./server/config');

const isDev = config.env === 'development';
const isProd = !isDev;
const entry = ['./src/index.js'];

module.exports = {
  devtool: isDev && 'cheap-module-source-map',
  entry,
  mode: config.env,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    overlay: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: config.env
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/media/[name]/[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    isProd
      ? new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].chunk.css'
        })
      : () => {},
    isProd ? new ManifestPlugin() : () => {},
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env)
    }),
    isDev
      ? new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'public/index.html'),
          inject: true,
          favicon: 'public/favicon.ico'
        })
      : () => {}
  ],
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          },
          warnings: false
        }
      }),
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxInitialRequests: 20,
      maxAsyncRequests: 20,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `${cacheGroupKey}.${packageName.replace('@', '')}`;
          }
        },
        common: {
          minChunks: 2,
          priority: -10
        }
      }
    },
    runtimeChunk: 'single'
  }
};
