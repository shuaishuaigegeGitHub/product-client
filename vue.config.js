const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: "./",
    outputDir: "dist",
    devServer: {
        port: "8085",
        host: "localhost",//"fengling.com",
        open: true, //配置自动启动浏览器
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].title = '项目管理';
                return args;
            });
    }
};