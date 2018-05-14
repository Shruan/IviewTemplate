<template lang="html">
  <div class="">
    <transition :name="transitionName">
      <router-view class="router"/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    }
  }
}
</script>

<style lang="css">
</style>
