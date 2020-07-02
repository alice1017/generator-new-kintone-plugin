const path = require("path");
const { join } = require("path");
const resolve = (...files) => path.resolve(...files);

module.exports = {
  entry: {
    desktop: resolve("src", "desktop.js"),
    config: resolve("src", "config.js")
  },
  output: {
    path: resolve("dist"),
    filename: "{name}.js"
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  ie: 11
                },
                useBuiltIns: "usage",
                corejs: 3
              }
            ]
          ]
        }
      }
    }]
  }
};
