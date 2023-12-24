const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
export const webpack = ({ config, mode }) => {
    // if(process.env.NODE_ENV !== 'development'){
    //     config.optimization = {
    //         ...config.optimization,
    //         minimize: true,
    //         minimizer: [
    //             new UglifyJsPlugin({
    //                 test: /\.js(\?.*)?$/i,
    //             }),
    //         ],
    //     }
    //
    //     config.plugins.push(
    //         new CompressionPlugin({
    //             algorithm: "gzip",
    //             test: /\.js$|\.css$|\.html$/,
    //             threshold: 10240,
    //             minRatio: 0.8
    //         }),
    //     )
    // }
};
