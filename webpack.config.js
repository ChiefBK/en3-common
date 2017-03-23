
module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        loaders: []
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: 'en3-common-bundle.js'
    },
    node: {
        fs: "empty"
    }
};