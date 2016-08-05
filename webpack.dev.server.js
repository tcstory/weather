var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');

var webpackConfig = require('./webpack.dev.config.js');

var local_server_config = {
    address: '0.0.0.0',
    port: 4000
};
var local_server_host = '';
if (process.env.AUTO === '1') {
    if (process.env.HTTPS === '1') {
        local_server_host = 'https://' + local_server_config.address + ':' + local_server_config.port;
        webpackConfig.entry.app.unshift(
            "webpack-dev-server/client?" + local_server_host,
            "webpack/hot/dev-server"
        );
    } else {
        local_server_host = 'http://' + local_server_config.address + ':' + local_server_config.port;
        webpackConfig.entry.app.unshift(
            "webpack-dev-server/client?" + local_server_host,
            "webpack/hot/dev-server"
        );
    }
} else {
    local_server_host = 'http://' + local_server_config.address + ':' + local_server_config.port;
}

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
    contentBase: './dist/',
    stats: {colors: true},
    https: process.env.HTTPS === '1' ? true : false
});
server.listen(local_server_config.port, local_server_config.address, function () {
    console.log('Listen on: ' + local_server_host);
});
