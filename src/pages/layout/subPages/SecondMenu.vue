<template lang="html">
  <!-- 二级菜单 -->
  <div
    class="smy__second-menu"
    :class="{'smy__second-menu-hide': !isVisibleSecondMenu}"
    :style="{'z-index': isVisibleSecondMenu ? '1' : ''}"
  >
    <div class="logo-text">
      Iview-Template
    </div>
    <Menu
      ref="secondMenu"
      theme="light"
      style="width: 160px;height: 100%;overflow-x: hidden;"
      @on-select="onSelect"
      :open-names="openNames"
      :active-name="tag"
    >
        <Submenu
          :name="firstMenu + '-' + index"
          v-for="(menu, index) in secondMenuList[firstMenu]"
          :key="menu.name"
        >
            <template slot="title">
              <span class="title-text">
                <Icon
                  :type="menu.icon"
                  :size="menu.size ? menu.size : '16'"
                  style="vertical-align: baseline;"
                ></Icon>
                {{menu.name}}
              </span>
            </template>
            <MenuItem
              :name="firstMenu + '-' + index + '-' + i"
              v-for="(item, i) in menu.list"
              :key="item.name"
            >
            <span style="color:#80848F; font-size: 13px; margin-left: 5px;">
              {{item.name}}
            </span>
            </MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('menu', [
      'isVisibleSecondMenu',
      'firstMenu',
      'secondMenuList',
      'tag'
    ]),
    // 获取应展开的二级菜单
    openNames () {
      let openNames = []
      for (let i in this.secondMenuList[this.firstMenu]) {
        openNames.push(this.firstMenu + '-' + i)
      }
      return openNames
    }
  },
  watch: {
    // 刷新二级菜单的展开状态
    openNames () {
      this.$nextTick(() => {
        let menu = this.$refs.secondMenu
        menu.updateOpened()
        menu.updateActiveName()
      })
    },
    tag () {
      this.$nextTick(() => {
        let menu = this.$refs.secondMenu
        menu.updateOpened()
        menu.updateActiveName()
      })
    }
  },
  methods: {
    ...mapMutations('menu', [
      '_secondMenu'
    ]),
    ...mapActions('menu', [
      '_AddTag'
    ]),
    onSelect (name) {
      this._AddTag(name)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/whole';

// 不显示滚轮
::-webkit-scrollbar{
  display:none;
}

.ivu-menu {
  position: inherit;
}

.smy__second-menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  box-shadow: 2px 0 6px #EDEDED;
  transition: 0.5s;
  -webkit-transition: 0.5s;

  .logo-text {
    flex-shrink: 0;
    display: flex;
    height: 60px;
    width: 160px;
    color: @primary-color;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    background: #FFF;
    box-shadow: 0 2px 6px #EDEDED;
    z-index: 999;
  }

  .title-text {
    color: #80848F;
  }

}

.smy__second-menu-hide{
  width: 0px;
  opacity: 0;
}
</style>
