import './common/style.sass'

import Vue from 'vue'

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

const app7 = new Vue({
    el: '#app-7',
    data: {
        todos: [
            { text: 'Learn Javascript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
})

console.log(app7)
