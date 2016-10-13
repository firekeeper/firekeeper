# 说明文档

<!-- toc orderedList:0 -->

- [说明文档](#说明文档)
	- [配置说明](#配置说明)
		- [建立数据模型](#建立数据模型)
		- [拦截 Ajax 请求](#拦截-ajax-请求)

<!-- tocstop -->

## 配置说明

> 项目配置统一放置于 `config` 目录中
>
> 整体稳定度为1，极有可能发生变动。

### 建立数据模型

> faker.js
>
> 稳定度: 1
>
> 默认必须引用 yod-mock 模块并最终返回该模块
>
> 详细文档请参考: https://github.com/qiu8310/yod-mock

Usage:

```javascript
/**
 * 建立数据模型
 * @param {String} type 定义 type 名
 * @param {Object} data 定义 数据
 */
yod.type(type, data)
```

Example:

```javascript
定义 type: User
yod.type('User', {
    firstName: '@First',
    lastName: '@Last',
    sex: '@Sex',
    avatar: '@Avatar'
})
// 使用 type: User
console.log(yod({
    data: '@User'
}))
// 或者重复数据
console.log(yod({
    list: '@User.repeat(10)'
}))
```

### 拦截 Ajax 请求

> mock.js
>
> 稳定度: 1
>
> 该文件被 vendor/mock/mock-middleware.js 依赖，所以是必须的

Usage:

```javascript
/**
 * @param {String} url 拦截的请求地址
 * @param {String} type 拦截的请求类型，可接受的参数有: POST, GET
 * @param {Object} data 返回的数据，可以使用 yod 随机生成数据模型
 */
Mock.mock(url, type, data)
 ```

Example:

```javascript
// 拦截以 POST 方式提交的 /register 方法，随机返回 status 0 或 1
Mock.mock('/register', 'POST', yod({
    status: '@Integer(0,1)'
}))
```
