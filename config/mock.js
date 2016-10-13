const yod = require('./faker')
const Mock = require('../vendor/mock/mock')

/**
 * 使用 Mock.js 拦截 ajax 请求，并返回数据
 *
 * Usage:
 *   @param {String} url 拦截的请求地址
 *   @param {String} type 拦截的请求类型，可接受的参数有: POST, GET
 *   @param {Object} data 返回的数据，可以使用 yod 随机生成数据模型
 *   Mock.mock(url, type, data)
 *
 * Example:
 *   // 拦截以 POST 方式提交的 /register 方法，随机返回 status 0 或 1
 *   Mock.mock('/register', 'POST', yod({
 *      status: '@Integer(0,1)'
 *   }))
 */



module.exports = Mock