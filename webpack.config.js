const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPreset = require("postcss-preset-env");
const mode = process.env.MODE_ENV || "development";

const devMode = mode === "development";

const target = devMode ? "web" : "browserlist";
const devtool = devMode ? "source-map" : null;

module.exports = {
  mode,
  target,
  devtool,
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],

  output: {
    assetModuleFilename: "[name][hash][ext]",
    filename: "index.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.m?.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.html$/,
        use: "html-loader",
      },

      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPreset],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
