module.exports = {
    entry: __dirname + '/src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'tetraring.js'
    },
    module: {
        loaders: [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                loader  : 'babel-loader' ,
                query   : {
                    presets: ['es2015']
                }
            }
        ]
    }
};
