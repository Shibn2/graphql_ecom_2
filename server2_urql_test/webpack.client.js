const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
    target: 'web',
    entry: "./client.js",
    output: {
        path: path.resolve(__dirname,"build/client"),
        filename: "client.js",
        libraryTarget: "umd"
    }
})