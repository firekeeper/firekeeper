const yod = require('yod-mock')

/**
 * 创建数据模型，定义 type
 * 该文件被 mock.js 依赖，所以是必需的
 *
 * @TODO 避免修改数据后需要重启服务才能生效
 *
 * Usage:
 *   @param {String} type 定义 type 名
 *   @param {Object} data 定义 数据
 *   yod.type(type, data)
 *
 * Example:
 *   // 定义 type: User
 *   yod.type('User', {
 *       firstName: '@First',
 *       lastName: '@Last',
 *       sex: '@Sex',
 *       avatar: '@Avatar'
 *   })
 *   // 使用 type: User
 *   console.log(yod({
 *       data: '@User'
 *   }))
 *   // 或者重复数据
 *   console.log(yod({
 *       list: '@User.repeat(10)'
 *   }))
 *
 * 详细文档请参考: https://github.com/qiu8310/yod-mock
 */

module.exports = yod
