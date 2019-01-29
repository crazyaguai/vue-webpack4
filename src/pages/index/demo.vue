<template>
    <div class="demo-container">
        <Language></Language>
        <div>{{$t('lang')}}</div>
        <img :src="require('img/demo.jpeg')" alt="">
        <div>{{a}}</div>
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
            return {}
        },
        watch: {},
        computed: {
            a(){
                return number.add0(1,3)
            }
        },
        methods: {},
        created() {
        },
        mounted() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="scss" scoped>
    .demo-container{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        color: blue;
        font-size: 24px;
    }
</style>

