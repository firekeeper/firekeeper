'use strict'
/**
 * 引用依赖
 * yod 用来生成数据
 * Mock 用来拦截 Ajax 请求
 */
const yod = require('./faker')
const Mock = require('../vendor/mock/mock')
/**
 * 使用 yod 与 Mock 拦截 Ajax 并生成假数据
 * @returns {Object} 带有拦截数据的 Mock 实例
 */
module.exports = Mock
