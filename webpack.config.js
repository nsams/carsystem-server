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
