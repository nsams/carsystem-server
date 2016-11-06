 /*
 module.exports = {
     entry: {
         main: ['./frontend/main.js']
     },
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
 };
*/

const webpack = require('webpack');

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            './frontend/main.js'
        ],
    },
    devtool: "source-map", // or "inline-source-map"
    output: {
        filename: './bin/[name].js',
        chunkFilename: "./bin/[id].js"
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?importLoaders=1"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.tpl$/,
                loader: "underscore-template-loader"
            },
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            },
        ]
    }
}