<template lang="html">
  <Modal
    v-model="localVisible"
    title="图片查看"
    :styles="{top: '100px', 'margin-bottom': '100px', width: 'auto'}"
    @on-ok="$emit('on-close')"
    @on-cancel="$emit('on-close')"
  >
    <div slot="footer">
    </div>
    <div class="chevron">
      <div
        class="chevron-left"
        v-show="chevronVisible"
        @click="index = ((index - 1) < 0 ? (pics.length - 1) : (index - 1))"
      >
        <Icon
        type="chevron-left"
        size="16"
        ></Icon>
      </div>
      <div
        class="chevron-right"
        v-show="chevronVisible"
        @click="index = ((index + 1) > (pics.length - 1) ? 0 : (index + 1))"
        >
        <Icon
        type="chevron-right"
        size="16"
        ></Icon>
      </div>
    </div>
    <img
      width="100%"
      v-if="pics.length > 0"
      :src="pics[index]"
      >
  </Modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    pics: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      localVisible: this.visible,
      current: 0,
      chevronVisible: true
    }
  },
  watch: {
    visible (val) {
      this.localVisible = val
    }
  }
}
</script>

<style lang="less" scoped>
.chevron {
  width: 100%;
  height: 90%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -16px;

  .chevron-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius:50%;
    // border: 1px solid #AAA;
    color: #FFF;
    background: #000;
    margin-left: 20px;
    opacity: 0.1;
    transition: .5s;
  }

  .chevron-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius:50%;
    // border: 1px solid #AAA;
    color: #FFF;
    background: #000;
    margin-right: 20px;
    opacity: 0.1;
    transition: .5s;
  }

  .chevron-left:hover, .chevron-right:hover {
    opacity: 0.5;
  }

}
</style>
