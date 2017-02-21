var config = module.exports = {
    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].bundle.js?[hash]',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ],
    },

    devtool: "sourcemap"
};
