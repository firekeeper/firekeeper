> compass 提供了 Sass、Scss 的 Mixin 和函数

<!-- toc orderedList:0 -->

- [variables](#variables)
	- [`$design-size`](#design-size)
	- [`$dev-size`](#dev-size)
	- [`$root-size`](#root-size)
	- [`$ratio`](#ratio)
	- [`$default-unit`](#default-unit)
	- [`$media-list`](#media-list)
	- [`$font-color`](#font-color)
	- [`$font-size`](#font-size)
	- [`$font-family`](#font-family)
- [gird 栅格系统](#gird-栅格系统)
	- [`@mixin grid`](#mixin-grid)
	- [`@mixin make-grid($num)`](#mixin-make-gridnum)
- [layout 布局](#layout-布局)
	- [`make-table-layout($col, $width, $align)`](#make-table-layoutcol-width-align)
- [media](#media)
	- [`@mixin media($list)`](#mixin-medialist)
- [normalize](#normalize)
	- [`@mixin normalize`](#mixin-normalize)
- [unit 单位设置](#unit-单位设置)
	- [`@function strip-unit($value)`](#function-strip-unitvalue)
	- [`@function px($value)`](#function-pxvalue)
	- [`@function rem($value)`](#function-remvalue)
	- [`@function default-unit($value)`](#function-default-unitvalue)
	- [`@function u($value)`](#function-uvalue)
- [util](#util)
	- [`@function eq($val1, $val2)`](#function-eqval1-val2)
	- [`@mixin padding($size...)`](#mixin-paddingsize)
	- [`@mixin margin($size...)`](#mixin-marginsize)
	- [`@mixin relative($size...)`](#mixin-relativesize)
	- [`@mixin absolute($size...)`](#mixin-absolutesize)
	- [`@mixin fixed($size...)`](#mixin-fixedsize)
	- [`@mixin size($width, $height)`](#mixin-sizewidth-height)
	- [`%clearfix`](#clearfix)
	- [`%ellipsis`](#ellipsis)

<!-- tocstop -->

## variables

### `$design-size`

设计稿的尺寸。

### `$dev-size`

开发尺寸。

### `$root-size`

根节点 html 的 font-size。

### `$ratio`

设计稿尺寸与开发尺寸的比例。

### `$default-unit`

默认单位。

### `$media-list`

移动端开发 media 的断点。

### `$font-color`

设置默认字体颜色。

### `$font-size`

设置默认字体大小。

### `$font-family`

设置默认字体。

## gird 栅格系统

### `@mixin grid`

创建 24 栅格系统。

Sass:

```sass
+grid
```

调用该 Mixin 后即可在页面中使用 class: `col-1` - `col-24` 或 `offset-1` - `offset-24`。

### `@mixin make-grid($num)`

$num: 将行等分成 \$num 列。

自行创建等宽的栅格样式。

当 24 栅格布局无法满足需求时，例如 5列 7列 9列 等，可以使用该 Mixin。

Sass:

```sass
.make-5-col
    +make-grid(5)
```

Css:

```css
.make-5-col {
    float: left;
    width: 20%;
}
```

## layout 布局

### `make-table-layout($col, $width, $align)`

$col: 设置 table 中有多少格 table-cell;

$width: 设置 table 的宽度，默认: 100%;

$align: 设置 table 的对齐方式，默认: middle;

创建 table 布局。

Sass
```sass
.table-layout
    +make-table-layout(3)
```

Css
```css
.table-layout {
    width: 100%;
    display: table;
}

.table-layout .table-layout-inner {
    width: 33.3333%;
    display: table-cell;
    vertical-align: middle;
}
```

## media

### `@mixin media($list)`

$list: 设置断点，类型为 list，默认值: \$media-list;

创建 media query 改变 html 的 font-size，用于移动端开发。

Sass:

```sass
+media
```

## normalize

### `@mixin normalize`

统一不同浏览器之间的样式。

Sass:

```sass
+normalize
```

## unit 单位设置

### `@function strip-unit($value)`

$value: 需要处理的值;

return: 去掉单位后的值;

移除值的单位。

Sass:

```sass
// 得到 100
strip-unit(100px)
// 得到 100
strip-unit(100%)
```

### `@function px($value)`

$value: 需要处理的值;

return: 转换单位后的值;

转换单位为 px。

Sass:

```sass
// 得到 100px
px(100)
// 得到 100px
px(100%)
```

### `@function rem($value)`

$value: 需要处理的值;

return: 转换单位后的值;

转换单位为 rem。

得到的结果会因 $design-size 和 \$root-size 而不同。

Sass:

```sass
// 得到 1rem
rem(100px)
```

### `@function default-unit($value)`

$value: 需要处理的值;

return: 转换单位后的值;

将值转换为默认单位，默认单位在 `variables.sass` 中配置。

```sass
$default-unit: px
// 得到 100px
default-unit(100)
$default-unit: rem
// 得到 1rem
default-unit(100)
```

### `@function u($value)`

$value: 需要处理的值;

return: 转换单位后的值;

如果单位已存在，则不处理值。

如果单位不存在，则使用默认单位。

Sass

```sass
$default-unit: rem
// 得到 100px
u(100px)
// 得到 1rem
u(100)
```

## util

### `@function eq($val1, $val2)`

$val1, $val2: 比较的两个值;

return: true 或 false;

比较两个值是否相等，Sass 中 == 默认只比较数值不比较单位，例如 1px == 1rem，而 `eq` 函数还会比较单位，所以 eq(1px, 1rem) == false。

同样，该函数也可以作用于 `list` 类型。

Sass:

```sass
// false
eq(1px, 1rem)
// true
eq(1, 1)
// true
eq(1 2, 1 2)
```

### `@mixin padding($size...)`

$size...: padding 的尺寸，至少接收一个参数，最多四个。

设置 padding 的尺寸，默认顺序为顺时针，分别是 上 右 下 左，如果不想设置某个方向，则可以使用 n 来代替。

只设置一个值

Sass:

```sass
.padding
    +padding(10px)
```

Css:

```css
.padding {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
```

设置两个值

Sass:

```sass
.padding
    +padding(10px, 20px)
```

Css:

```css
.padding {
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
}
```

使用占位符

Sass:

```sass
.padding
    +padding(n, 10px)
```

Css:

```css
.padding {
    padding-right: 10px;
    padding-left: 10px;
}
```

### `@mixin margin($size...)`

使用方式同 [`padding`](#mixin-paddingsize)

### `@mixin relative($size...)`

使用方式同 [`padding`](#mixin-paddingsize)

### `@mixin absolute($size...)`

使用方式同 [`padding`](#mixin-paddingsize)

### `@mixin fixed($size...)`

使用方式同 [`padding`](#mixin-paddingsize)

### `@mixin size($width, $height)`

$width: 设置宽度;

$height: 设置高度，默认值: \_;

设置尺寸，第二个值是可选的，如果不填，则宽高一致，如果填 n，则只设置高。

Sass:

```sass
.size
    +size(10px)

.size2
    +size(10px, 20px)

.size3
    +size(10px, n)
```

Css:

```css
.size {
    width: 10px;
    height: 10px;
}

.size2 {
    width: 10px;
    height: 20px;
}

.size3 {
    width: 10px;
}
```

### `%clearfix`

清除浮动。

Sass:

```sass
.float
    @extends %clearfix
```

### `%ellipsis`

折叠文本。
