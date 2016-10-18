/**
 * Created by ashenone on 16-10-18.
 */

import $ from 'jquery'

import sassUnitStyle from './style.sass'

// 输出标题并绑定相关事件
function createTitle(title) {
    $(`<div class="${sassUnitStyle.title}">${title}</div>`)
        .on('click', () => {

        })
        .appendTo('body')
}

// 输出 scss 返回的测试内容
function echo(contents) {
    let passed = 0
    let failed = 0
    let count = Object.keys(contents).length
    for (let content in contents) {
        $(`<div class="${contents[content]}"></div>`).appendTo('body')
        if (content.indexOf('passed') > -1) {
            passed += 1
        }
        else if (content.indexOf('failed') > -1) {
            failed += 1
        }
    }
    statistics(contents, passed, failed, count)
}

function statistics(contents, passed, failed, count) {
    $(
        `<div class="${sassUnitStyle.statistics}">Testing: ${count} | Passed: ${passed} | Failed: ${failed}</div>`
    ).appendTo('body')
}

// 执行测试
function SassUnit(model, contents) {
    createTitle(model)
    echo(contents)
}

export default SassUnit
