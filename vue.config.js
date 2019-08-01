/**
 * Created by Administrator on 2018/9/23 0023.
 */
var webpack=require('webpack');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
    //baseUrl: './',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hot: true
    },
    outputDir: 'dist',//输出文件夹名称
    productionSourceMap: false,//生产环境是否生成 sourceMap 文件
    lintOnSave: false,//是否采用eslint验证代码
    pages:{
    	index:{
	        // entry for the page
	        entry:'src/main.js',
	        // the source template
	        // title:"Login page",
	        template:'public/index.html',
	        // output as dist/index.html
	        filename:'index.html'
	        //title:"工作台",//title没用
	       	//chunks: ["chunk-vendors", "chunk-common", "index"]
	    },
    },
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@$',resolve("src"))
        .set('@views',resolve("views"))
        .set('@components', resolve('src/components'))
        .set('@assets', resolve('src/assets'));
    }
}