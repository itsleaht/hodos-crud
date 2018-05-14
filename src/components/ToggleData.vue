<template>
  <div class="field column">
    <a class="button is-dark" @click="toggleData = !toggleData"><span>Toggle Data</span> <i class="fas fa-angle-down"></i></a>
    <transition name="grow"  mode="out-in">
      <pre v-if="toggleData" ref="codeData"  v-highlightjs>
        <code class="json">{{data}}</code>
      </pre>
    </transition>
  </div>
</template>
<script>

export default {
  name: 'toggle-data',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      toggleData: false
    }
  },
}
</script>
<style lang="scss" scoped>

  .grow-enter-active, .grow-leave-active {
    transition: all 1s;
  }
  .grow-enter, .grow-leave-to {
    max-height: 0;
    opacity: 0;
  }

  div {
    position: relative;
    width: 820px;
    margin: 30px auto 100px;
    border-radius: 10px;

    a {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 13px;
      z-index: 10;

      span {
        padding-right: 10px;
      }
    }
    pre {
      max-width: 100%;
      max-height: 500px;
      border-radius: 10px;
      white-space: pre-wrap;
      opacity: 1;
      text-align: left;
    }
  }
</style>
