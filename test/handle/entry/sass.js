/**
 * Created by ashenone on 16-10-21.
 */

import SassUnit from 'vendor/sass-unit/core'

import eqCase from '../../suite/sass/eq-case.scss'
import stripUnitCase from '../../suite/sass/strip-unit-case.scss'
import pxCase from '../../suite/sass/px-case.scss'
import remCase from '../../suite/sass/rem-case.scss'
import uCase from '../../suite/sass/u-case.scss'

SassUnit('eq 测试', eqCase)

SassUnit('strip-unit 测试', stripUnitCase)

SassUnit('px 测试', pxCase)

SassUnit('rem 测试', remCase)

SassUnit('u 测试', uCase)
