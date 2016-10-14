import './common/style.sass'

import $ from 'jquery'

$.ajax({
    url: '/userinfo',
    type: 'get',
    dataType: 'json',
    success: function(data) {
        console.log(data)
    }
})
