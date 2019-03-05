<template>
    <div class="demo-container">
        <Language></Language>
        <div>{{$t('lang')}}</div>
        <img :src="require('img/demo.jpeg')" alt="">
        <div>{{a}}</div>
        <input v-if="show" type="text" v-length="{model: 'num', length: 6,type: 'number'}" v-model="num">
        <button @click="show=!show">123</button>
        <span>{{aaa | add0(10)}}</span>
        <input type="text" v-model="ss">
    </div>
</template>

<script>
    import Language from '@/lang/language'
    import number from '@/common/number'

    export default {
        components: {
            Language
        },
        props: {},
        data() {
            return {
                num: 1,
                aaa: 0.1,
                ss: '',
                show: true
            }
        },
        watch: {},
        computed: {
            a() {
                return number.add0(1, 3)
            }
        },
        methods: {
            logSS(){
                console.log(this.ss)
            }
        },
        created() {
        },
        mounted() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="scss" scoped>
    .demo-container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        color: blue;
        font-size: 24px;
    }
</style>

