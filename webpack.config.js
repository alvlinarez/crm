const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const entry = ['./src/index.js'];

module.exports = function (_env, argv) {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;
  return {
    devtool: isDev && 'cheap-module-source-map',
    entry,
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
              envName: isProd ? 'production' : 'development'
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
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].chunk.css'
        }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        )
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: true,
        favicon: 'public/favicon.ico'
      })
    ].filter(Boolean),
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
        chunks: 'async',
        name: true,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            chunks: 'all',
            reuseExistingChunk: true,
            priority: 1,
            filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[hash].js',
            enforce: true,
            test(module, chunks) {
              const name = module.nameForCondition && module.nameForCondition();
              return chunks.some((chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name));
            },
          },
        },
      },
      runtimeChunk: 'single'
    }
  };
};
