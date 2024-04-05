const path = require("path");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  entry: {
    "sg-blocks-scripts-editor": "./src/blocks/editorIndex.ts",
    "sg-blocks-scripts": "./src/blocks/viewIndex.ts",
    "sg-blocks-scripts-admin": "./src/assets/js/admin/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "assets/js/[name].js",
    chunkFilename: "assets/js/chunks/[id].js",
    clean: isProduction,
    
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
