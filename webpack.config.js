const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const port = process.env.PORT || 3000;

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      filename: 'bundle.[hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg|gif)$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]',
            limit: 5000,
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'app1',
        remotes: {
          app2: 'app2@[app2Url]/remoteEntry.js',
        },
        shared: { 'react': { singleton: true }, 'react-dom': { singleton: true } },
      }),
      new ExternalTemplateRemotesPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'app.css',
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      host: 'localhost',
      port,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
  };
};
