const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        // compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Procedural Garden',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
};