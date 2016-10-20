import './common/style.sass'

import SassUnit from 'vendor/sass-unit/core'

import eqCase from '../../test/sass/eq-case.scss'
import stripUnitCase from '../../test/sass/strip-unit-case.scss'
import pxCase from '../../test/sass/px-case.scss'
import remCase from '../../test/sass/rem-case.scss'
import uCase from '../../test/sass/u-case.scss'

SassUnit('eq 测试', eqCase)

SassUnit('strip-unit 测试', stripUnitCase)

SassUnit('px 测试', pxCase)

SassUnit('rem 测试', remCase)

SassUnit('u 测试', uCase)
