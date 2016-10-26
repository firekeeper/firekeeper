## 拦截 Ajax

> 拦截 Ajax 并返回模拟数据可以解决必须等待前端数据接口开发完毕才能对接的问题，能够提前写好 Ajax 部分的相关代码。

### Example

首先在 `config/mock.js` 中配置拦截方法

```javascript
    // 拦截以 POST 方式请求的 /login 方法
    // 并返回一个 JSON
    Mock.mock('/login', 'POST', {
        status: 1
    })
```

在项目中正常书写 Ajax 相关参数

```javascript
$('.login').on('click', function() {
    $.ajax({
        url: '/login',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            // 输出 { status: 1 }
            console.log(data)
        }
    })
})
```

由于 `config/mock.js` 会被 `mock-middleware` 引用并交由 `yod-mock` 处理，所以可以使用 `yod-mock` 来生成丰富的随机假数据，相关 API 可以参考此 [文档](https://github.com/qiu8310/yod-mock)

```javascript
Mock.mock('/userinfo', 'POST', {
    name: '@ChineseName',
    age: '@Age',
    avatar: '@Avatar',
    gender: '@Gender',
    telephone: '@Telephone'
})
```

如此一来每当程序请求 `/userinfo` 接口，都会返回**随机**的假数据，且该数据完全符合该字段的类型，例如:

```json
{
    "name": "小明",
    "age": 18,
    "avatar": "avatar_url",
    "gendor": "Male",
    "telephone": "15152122900"
}
```

DEMO: [在线地址](http://qiu8310.github.io/yod-mock/)
