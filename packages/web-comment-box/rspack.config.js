const path = require("node:path");
const rspack = require("@rspack/core");
const { defineConfig } = require("@rspack/cli");

const CSS_LOADER = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[local]", // 保留原始名称
    },
  },
};

module.exports = defineConfig({
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    filename: "come_comment_box.js",
    path: path.resolve(__dirname, "dist"),
    library: "ComeCommentBox",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
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
                importSource: "preact",
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [rspack.CssExtractRspackPlugin.loader, CSS_LOADER],
      },
      {
        test: /\.less$/,
        use: [rspack.CssExtractRspackPlugin.loader, CSS_LOADER, "less-loader"],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "example", "index.html"),
      inject: false,
    }),
    new rspack.CssExtractRspackPlugin({
      filename: "come_comment_box.css",
    }),
  ],
  devServer: {
    port: 8080,
    host: "0.0.0.0",
  },
});
