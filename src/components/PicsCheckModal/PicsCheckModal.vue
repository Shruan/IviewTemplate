<template lang="html">
  <!-- 图片查看组件 -->
  <div class="pics-check-modal">
    <transition :name="transitionNames[1]">
      <div class="shy__modal-mask" v-show="isShow"/>
    </transition>
    <transition :name="transitionNames[0]">
      <div class="shy__modal-wrap" v-show="isShow" @click.stop.prevent="closeModal">
        <div class="shy__modal" @click.stop.prevent="maskClick">
          <div class="shy__modal-content">
            <span class="shy__modal-close" @click.stop.prevent="closeModal">
              <i class="shy__icon shy__icon-ios-close-empty"/>
            </span>
            <div class="shy__modal-header">
              <div class="shy__modal-header-inner">图片查看</div>
            </div>
            <div class="shy__modal-body">
              <div class="chevron" v-if="pics.length > 0">
                <div
                  class="chevron-left"
                  v-show="chevronVisible"
                  @click="current = ((current - 1) < 0 ? (pics.length - 1) : (current - 1))"
                >
                  <Icon
                  type="chevron-left"
                  size="16"
                  ></Icon>
                </div>
                <div
                  class="chevron-right"
                  v-show="chevronVisible"
                  @click="current = ((current + 1) > (pics.length - 1) ? 0 : (current + 1))"
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
                :src="pics[current]"
              >
            </div>
            <div class="shy__modal-footer">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
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
      isShow: this.value,
      current: 0,
      chevronVisible: true,
      transitionNames: ['ease', 'fade']
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    maskClick () {},
    closeModal () {
      this.isShow = false
    }
  }
}
</script>

<style lang="css" scoped>
  .shy__modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
  }
  .shy__modal-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .shy__modal {
    width: auto;
    margin: 0 auto;
    position: relative;
    outline: none;
    top: 100px;
    margin-bottom: 100px;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
  }
  .shy__modal-wrap * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .shy__modal-content {
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
  }
  .shy__modal-close {
    font-size: 12px;
    position: absolute;
    right: 16px;
    top: 8px;
    overflow: hidden;
    cursor: pointer;
  }
  .shy__modal-close .shy__icon-ios-close-empty {
    font-size: 31px;
    color: #999;
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
    position: relative;
    top: 1px;
  }
  .shy__close-transition {
    height: 0;
    opacity: 0;
  }
  .shy__open-transition {
    height: 100%;
    opacity: 1;
  }
  .shy__modal-header {
    border-bottom: 1px solid #e9eaec;
    padding: 14px 16px;
    line-height: 1;
  }
  .shy__modal-header-inner {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #1c2438;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .shy__modal-body {
    padding: 16px;
    font-size: 12px;
    line-height: 1.5;
  }
  .shy__icon {
    display: inline-block;
    font-family: "Ionicons";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .shy__icon-ios-close-empty:before {
    content: "\F404";
  }
  .chevron {
    width: 100%;
    height: 80%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: -16px;
  }

  .chevron-left {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    cursor: pointer;
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
</style>
