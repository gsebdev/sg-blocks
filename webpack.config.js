const path = require("path");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    editor: "./src/blocks/index.ts",
    gallery: "./src/blocks/gallery/gallery.ts",
    reservation: "./src/blocks/reservation/reservation.ts",
    map: "./src/blocks/map/map.ts",
    "query-related": "./src/blocks/query-related/slide.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "blocks/[name]/[name].js",
    chunkFilename: "assets/js/chunks/[id].js",
    //clean: true,
    
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new DependencyExtractionWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "src", to: "./", globOptions: { ignore: ["**/*.ts", "**/*.tsx", "**/*.scss", "**/*.jsx", "**/*.js"] } }],
    }),
  ],
};
