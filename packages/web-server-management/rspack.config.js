const { defineConfig } = require("@rspack/cli");
const path = require("node:path");
const rspack = require("@rspack/core");

module.exports = defineConfig({
  entry: {
    main: path.resolve(__dirname, "./src/index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/"),
  },
  plugins: [
    // each entry output css
    new rspack.CssExtractRspackPlugin({
      filename: "[name].css",
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "builtin:swc-loader",
        exclude: [/[\\/]node_modules[\\/]/],
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
            externalHelpers: true, // <- 注意需要安装 @swc/helpers
          },
        },
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
});
