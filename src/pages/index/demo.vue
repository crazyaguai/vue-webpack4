<template>
  <div class="demo-container">
    <Language />
    <div>{{ $t('lang') }}</div>
    <img
      :src="require('img/demo.jpeg')"
      alt=""
    >
    <div>{{ a }}</div>
    <input
      v-if="show"
      v-model="num"
      v-length="{model: 'num', length: 6,type: 'number'}"
      type="text"
    >
    <button @click="show=!show">
      123
    </button>
    <span>{{ aaa | add0(10) }}</span>
    <input
      v-model="ss"
      type="text"
    >
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
  computed: {
    a() {
      return number.add0(1, 3)
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    logSS(){
      console.log(this.ss)
    }
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

