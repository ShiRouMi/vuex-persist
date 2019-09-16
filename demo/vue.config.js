const path = require("path")
function resolve(dir) {
  return path.join(__dirname, "..", dir)
}
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" 
    ? "/vuex-storage-state/" 
    : "./",
  assetsDir: "./",
  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"))
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
