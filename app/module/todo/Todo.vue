<!--<template lang='pug'>-->
    <!--.abc-->
        <!--h1-->
            <!--| {{ msg }}-->
<!--</template>-->

<template>
    <div class="abc">
        <h1>{{msg}}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: '1111111111'
            }
        }
    }
</script>

<style lang='sass'>
    @import './style'
</style>