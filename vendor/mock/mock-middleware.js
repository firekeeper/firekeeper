/**
 * reload 模块，使用该方法加载模块时
 * 都会重新加载，这样可以解决更新 Mock 后必须重启服务的问题
 */
const reload = require('require-reload')(require)

function handleUrl(url) {
    return url.substring(0, url.lastIndexOf('?'))
}

/**
 * BrowserSync 的中间件，用于拦截请求以及返回假数据
 * @returns {Function} 适用于 middleware 的函数
 */
module.exports = function() {
    return function(req, res, next) {
        const mocks = reload('../../config/mock').mocks
        const method = req.method.toLowerCase()
        const url = method === 'get' ? handleUrl(req.url) : req.url
        if (mocks[method] && mocks[method][url]) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(mocks[method][url].template))
            return false
        }
        next()
    }
}
