<template lang="html">
  <!-- 首页五模块拼接入口 -->
  <div class="smy__box">
    <div class="smy__left">
      <FirstMenu/>
      <SecondMenu/>
    </div>
    <div class="smy__right">
      <HeadNav/>
      <HeadTags/>
      <div class="smy__content">
        <transition :name="transitionName">
          <router-view class="router"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import FirstMenu from './subPages/FirstMenu'
import SecondMenu from './subPages/SecondMenu'
import HeadNav from './subPages/HeadNav'
import HeadTags from './subPages/HeadTags'
import { mapState } from 'vuex'

export default {
  components: {
    FirstMenu,
    SecondMenu,
    HeadNav,
    HeadTags
  },
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState('menu', [
      'tag',
      'secondMenuList'
    ])
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    },
    // 监听选中的标签，进行页面跳转
    tag (val) {
      if (this.$route.name !== val) {
        setTimeout(() => { this.$router.push({ name: this.tag }) }, 100)
      }
    }
  },
  methods: {}
}
</script>

<style lang="less">
@import '../../assets/whole';

.smy__box {
  display: flex;
  height: 100%;

  //-------------组件样式重写-------------
  // 修改tag圆点颜色
  .ivu-tag-green,
  .ivu-tag-green, .ivu-tag-green.ivu-tag-dot .ivu-tag-dot-inner{
    background-color: #3ccba6;
  }

  // 修改二级菜单的hover颜色
  .ivu-menu-submenu-title:hover,.ivu-menu-item:hover {
    background: #F5F7F9;
  }

  // 修改二级菜单的上箭头边距
  .ivu-menu-submenu-title span i:last-child {
    margin-right: 0;
  }

  // ghost按钮中文字颜色
  .ivu-btn-ghost,.ivu-btn-default {
    color: #80848F;
  }

  // ghost按钮中文字hover颜色
  .ivu-btn-ghost:hover,.ivu-btn-default:hover {
    color: @primary-color;
  }

  // error按钮中文字颜色
  .ivu-btn-error {
    background: transparent;
    color: #80848F;
    border-color: #DDDEE1;
  }

  // error按钮中文字hover颜色
  .ivu-btn-error:hover {
    color: #F2795B;
    border-color: #F2795B;
  }
  //-------------组件样式重写结束-------------


  // 字体超出省略
  .smy__text-overflow-one-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // 页面布局
  .smy__left {
    display: flex;
    height: 100%;
  }

  .smy__right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .smy__content {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      position: relative;

      .smy__card-full-box {
        padding: 10px;
        height: 100%;
      }

      .smy__card-full {
        margin-bottom: 10px;
        min-height: 100%;

        .extra {
          font-size: 12px;
          color: #80848F;
        }
      }
      .extra {
        font-size: 12px;
        color: #80848F;
      }
      // ---路由切换动效---
      .router {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
      }

      .slider-parent {
        position: relative;
      }

      .slider{
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        position: absolute;
      }

      .slider-enter-left-active, .slider-left-leave-active {
        transition: all .3s;
        -webkit-transition: all .3s;
      }
      .slider-left-enter, .slider-left-leave-active {
        opacity: 0;
      }
      .slider-left-enter {
        transform: translateX(20px);
      }
      .slider-left-leave-active {
        transform: translateX(-20px);
      }

      .slider-enter-right-active, .slider-right-leave-active {
        transition: all .3s;
        -webkit-transition: all .3s;
      }
      .slider-right-enter, .slider-right-leave-active {
        opacity: 0;
      }
      .slider-right-enter {
        transform: translateX(-20px);
      }
      .slider-right-leave-active {
        transform: translateX(20px);
      }
      // ---路由切换动效 结束---
    }
  }
  // ---页面布局 结束---
}
</style>
