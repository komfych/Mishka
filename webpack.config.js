const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isDev = env.mode ==='development';
    const isProd = env.mode === 'production';
    return {
        mode: env.mode ?? 'development',
        devServer: {
            port: 4200,
            open: true
        },
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: "assets/[name][ext]"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'src', 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader"
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },
                {
                    test: /\.woff2?$/i,
                    type: "asset/resource",
                    generator: {
                        filename: 'fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.(jpe?g|png|webp|gif|svg)$/i,
                    type: "asset/resource"
                }
            ]
        }
    }
}









