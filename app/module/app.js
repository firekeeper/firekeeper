import './common/style.sass'

import Vue from 'vue'

const vm = new Vue({
    el: '#app-8',
    data: {
        a: 1
    },
    computed: {
        b: function() {
            return this.a + 1
        }
    }
})

window.vm = vm
