const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:9001/",
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false 
  },
 

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 9001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "micro1",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {"./Header":"./src/components/Header.jsx",
      "./Grid":"./src/components/Grid.jsx",
      "./addRow":"./src/utils/addRow.js",
      "./DataComponent":"./src/components/DataComponent.js",
      "./HookComponent":"./src/components/HookComponent.js",
      "./ThemeProvider":"./src/context/ThemeContext.js",
      "./ThemeSwitcher":"./src/components/ThemeSwitcher.js"
    },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
