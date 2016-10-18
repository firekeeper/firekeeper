import './common/style.sass'

import SassUnit from 'vendor/sass-unit/core'

import eqUnit from '../../test/sass/eq.scss'
import stripUnit from '../../test/sass/strip-unit.scss'

console.log(eqUnit)

SassUnit('eq 测试', eqUnit)

SassUnit('strip-unit 测试', stripUnit)