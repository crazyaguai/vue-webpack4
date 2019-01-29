<template>
    <div class="">
        <button @click="changeLanguage('zh-CN')">简体中文</button>
        <button @click="changeLanguage('en')">English</button>
    </div>
</template>

<script>
    import storage from '@/common/storage'
    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            changeLanguage(lang){
                storage.setItem('language',lang)
                this.$i18n.locale = lang
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
</style>

