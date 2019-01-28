var path = require('path')
module.exports = {
    //基本路径
    //baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
    baseUrl:"./",
    // 输出文件目录
    outputDir: 'exceptionSystem',
    //用于放置生成的静态资源
    assetsDir: "assets",
    //indexPath:path.resolve(__dirname,'public/index.html'),
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        //subpage: 'src/main.js'
    },
    /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
    productionSourceMap: true,
 /*   productionGzip: false,
    productionGzipExtensions: ['js', 'css'],*/
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '/api': {
                target: 'http:localhost:8080',
                //ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    },

}