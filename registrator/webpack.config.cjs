const nodeExternals = require("webpack-node-externals");
const path = require("path");
const DotenvWebpackPlugin = require("dotenv-webpack");

const { NODE_ENV } = process.env;

const plugins = [new DotenvWebpackPlugin()].filter(Boolean);

module.exports = {
    entry: "./src/regServer.ts",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].js",
        publicPath: "/",
    },
    mode: NODE_ENV,
    target: "node",
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
        },
        extensions: [".ts", ".js"],
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(ts?)$/,
                include: path.resolve(__dirname, "src"),
                exclude: "/node_modules/",
                use: ["ts-loader"],
            },
        ],
    },
    cache: true,
    devServer: {
        port: 3001,
        host: "0.0.0.0",
        historyApiFallback: true,
        hot: true,
    },
    cache: true,
    plugins: plugins,
};
