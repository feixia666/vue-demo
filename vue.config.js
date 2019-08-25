const webpack = require('webpack');  
const path = require('path');  
module.exports = {
  chainWebpack: (config) => {
      config.resolve.alias  
        .set('mui', path.resolve(__dirname, './src/lib/mui/js/mui.js'))  
    },
  configureWebpack: {      
    // 增加一个plugins  
    plugins: [
      new webpack.ProvidePlugin({
        mui: "mui", 
        "window.mui": "mui"
      })  
    ]  
  }
}