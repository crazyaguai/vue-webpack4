<template>
    <div class="h5-demo-container">
        <div>24</div>
        <img class="domo-img" :src="require('img/demo.jpeg')" alt="">
        <div class="border-demo">
            1px边框
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
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
    .h5-demo-container{
        text-align: center;
        font-size: 24px;
        .domo-img{
            width: 349px;
        }
        .border-demo{
            margin-top: 20px;
            border: 1px solid #000;
            text-align: center;
        }
    }
</style>

