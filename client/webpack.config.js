const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const { mode } = env;
  const devtool = mode === 'development' ? { devtool: 'source-map' } : {};

  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    ...devtool,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.[t,j]sx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test:  /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        },
        {
          test:  /\.ttf$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      static: './src',
      port: 3000,
      compress: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: env.mode,
        template: './src/index.html',
      }),
    ],
    mode: env.mode,
    resolve: {
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
  };
};
