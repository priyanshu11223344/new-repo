
const webpack=require('webpack');
module.exports=function override(config){

    
    const fallback =config.resolve.fallback || {};
    Object.assign(fallback,{
         zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        fs:false,
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        net:false,
        express: false,
        tls:false,
        url: require.resolve("url/") ,
        buffer: require.resolve("buffer/"),
        util: require.resolve("util/"),
        vm: require.resolve("vm-browserify"),
        async_hooks: false,
        devtool: 'source-map',


    });
    config.resolve.fallback=fallback;
    config.plugins=(config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process:"process/browser",
        }),
    ]);
    return config;
    
}