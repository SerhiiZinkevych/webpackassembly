const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const modeConfig = (env) => require(`./build-utils/${env.mode}.config`)(env);

module.exports = (env) =>
    merge(
        {
            context: path.resolve(__dirname, 'src'),
            entry: { main: './index.js' },
            mode: env.mode,
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: '[name].bundle.js',
                assetModuleFilename: 'images/[name][ext][query]',
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: ['babel-loader'],
                    },
                    {
                        test: /\.(png|jpe?g|gif|png)$/i,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.html$/i,
                        use: [
                            {
                                loader: 'html-loader',
                            },
                        ],
                    },
                ],
            },
            plugins: [
                new CleanWebpackPlugin(),
                new FriendlyErrorsWebpackPlugin(),
                new WebpackBar(),
            ],
        },
        modeConfig(env)
    );
