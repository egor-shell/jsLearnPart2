const path = require('path')

module.exports = {
    entry: './src/GunsList.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader'},
                ]
            }
        ]
    }
}