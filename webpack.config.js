const path = require('path');


module.exports = {
    mode: 'production',
    // entry: ['./src/js/formApp.js', './src/js/intlTelInput.js'],
    entry: {
        app: [
            './src/app.js',
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

    ],
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                use: ['file-loader']

            },




        ]
    },
    watch: true
};