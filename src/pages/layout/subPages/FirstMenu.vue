<template lang="html">
  <!-- 一级菜单 -->
  <div class="smy__first-menu-box">
    <div class="logo">
    </div>
    <div
      class="first-menu"
      :class="{'first-menu-check': index == firstMenu}"
      @click="_firstMenu(index)"
      v-for="(menu, index) in firstMenuList"
      :key="menu.name"
    >
      <div class="menu-icon">
        <Icon :type="menu.icon"></Icon>
      </div>
      <div class="menu-name">
        {{menu.name}}
      </div>
      <div :class="{'menu-shade': index == firstMenu}"></div>
      <Icon
        type="arrow-left-b"
        class="arrow"
        size="20"
        v-show="index == firstMenu"
      ></Icon>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('menu', [
      'firstMenu',
      'firstMenuList'
    ])
  },
  methods: {
    ...mapMutations('menu', [
      '_firstMenu'
    ])
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/whole';

.smy__first-menu-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  background: -webkit-linear-gradient(@primary-color, @nav-color); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(@primary-color, @nav-color); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(@primary-color, @nav-color); /* Firefox 3.6 - 15 */
  background: linear-gradient(@primary-color, @nav-color); /* 标准的语法 */
  padding-top: 5px;
  z-index: 99;

  .logo {
    width: 50px;
    height: 50px;
    background-image: url('../../../assets/img/logo.png');
    border-radius: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    margin-bottom: 5px;
  }

  .first-menu:hover {
    cursor: pointer;
    color: #FFF;
  }

  .first-menu {
    height: 50px;
    width: 60px;
    color: #D1F2E1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-icon {
      line-height: 22px;
      font-size: 20px;
    }

    .menu-name {
      margin-top: 5px;
      line-height: 12px;
      font-size: 12px;
    }

    .menu-shade {
      background: #333;
      opacity: 0.05;
      width:60px;
      height:50px;
      position:absolute;
    }
  }

  .first-menu-check {
    color: #FFF;
  }

  .arrow {
    position: absolute;
    left: 53px;
  }
}
</style>
