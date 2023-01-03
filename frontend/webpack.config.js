const path = require("path");
const Dotenv = require("dotenv-webpack");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

const plugins = [
    isProduction && new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
    }),
    new CopyPlugin({
        patterns: [
            {
                from: "public",
                globOptions: {
                    ignore: ["**/index.html"],
                },
                noErrorOnMissing: true,
            },
        ],
    }),
    new Dotenv(),
].filter(Boolean);

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
        clean: true,
    },
    mode: process.env.MODE ?? "development",
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
            assets: path.join(__dirname, "./assets"),
        },
        extensions: [".tsx", ".ts", ".js", "jsx"],
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        port: 8080,
        host: "0.0.0.0",
        historyApiFallback: true,
        hot: true,
    },
    plugins,
};