# Factorio

## 目录结构

```
Project/
├── app/
│   ├── css/
│   │   └── style.{sass, less, css}
│   ├── image/
│   │   └── picture.{jpg, png, svg, gif}
│   ├── script/
│   │   └── app.js
│   ├── vendor/
│   │   └── jquery/
│   │       └── jquery-3.1.0.min.js
│   ├── module/
│   │   │── common/
│   │   └── app.js
│   └── view/
│       └── index.{html, pug}
├── release/
│   ├── resource/
│   │   ├── css
│   │   ├── image
│   │   ├── script
│   │   └── vendor
│   └── view
├── gulpfile.js
├── package.json
└── README.md
```

## 命令

| 命令    | 描述                                        |
| ---     | ---                                         |
| default | 启动文件监听以及服务器                      |
| watch   | 启动文件监听                                |
| server  | 启动服务器                                  |
| css     | 添加浏览器私有前缀 -> 压缩 CSS              |
| sass    | 编译 Sass -> 添加浏览器私有前缀 -> 压缩 CSS |
| less    | 编译 Less -> 添加浏览器私有前缀 -> 压缩 CSS |
| pug     | 编译 Pug                                    |
| babel   | ES6 转 JavaScript -> 压缩 JavaScript        |
| image   | 压缩图片资源                                |
| vendor  | 复制 vendor 目录                            |
| clean   | 清空 release 目录                           |
| release | 打包项目                                    |

| 参数 | 描述                                 |
| ---  | ---                                  |
| -d   | 开发模式，使用sourcemaps，不执行编译 |

## TODO

[x] - 在 Mixin 中添加常用布局代码，例如栅格布局，display: table 布局等
[ ] - 增加 example 展示功能
[x] - 增加 media query Mixin
