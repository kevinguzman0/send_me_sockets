const path = require('path');

module.exports = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/,
    },
    entry: path.join(__dirname, "src/app", "index.js"),
    output: {
        path: path.resolve(__dirname, 'src/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: {
                    loader: 'url-loader?limit=100000'
                }
            },
        ]
    },
}