const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /.sass$/,
                loaders: ["style", "css", "sass"],
                include: path.resolve(__dirname, '../')
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
}