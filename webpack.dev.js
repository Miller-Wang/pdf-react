const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|pdf)$/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
