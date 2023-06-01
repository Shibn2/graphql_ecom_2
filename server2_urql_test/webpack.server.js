const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(config, {
  target: "node",
  entry: "./index.js",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build", "server"),
    filename: "index.js",
    libraryTarget: "commonjs"
  }
});
