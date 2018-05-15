<template lang="html">
  <!-- 头部标签页 -->
  <div class="smy__tag-box">
    <div class="smy__tab-list" ref="smyTagBox" @DOMMouseScroll="handlescroll"  @mousewheel="handlescroll">
      <div class="tagList" :style="{left: tagBodyLeft + 'px'}" ref="smyTagBody">
        <Tag
          type="dot"
          class="tag"
          ref="tagsPageOpened"
          :name="tagName.routerName"
          v-for="(tagName, index) in tagList"
          :key="tagName.routerName"
          :color="tagName.routerName == tag ? 'green' : 'default'"
          :closable="tagName.routerName != 'Index'"
          @on-close="closeTag"
          >
        <span
          @click.stop="$router.push({ name: tagName.routerName })"
          class="tagName"
        ></span>
        <!-- <template v-if="tagName == -1">首页</template>
        <template v-else>{{tagName}}</template> -->
          {{tagName.label}}
        </Tag>
      </div>
    </div>
    <div class="close-all-tag-con">
      <Dropdown
       trigger="click"
       placement="bottom"
       @on-click="tabMoreClick">
        <Button type="primary" class="search-button">
          关闭操作
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu
          slot="list"
          trigger="click"
        >
          <DropdownItem name="closeAll">关闭所有</DropdownItem>
          <!-- <DropdownItem name="closeLeft">关闭左边</DropdownItem>
          <DropdownItem name="closeRight">关闭右边</DropdownItem> -->
          <DropdownItem name="closeOther">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      tagBodyLeft: 10,
      refsTag: [],
      tagsCount: 1
    }
  },
  computed: {
    ...mapState('menu', [
      'secondMenuList',
      'tagList',
      'tag'
    ])
  },
  methods: {
    // show () {
      // alert(1)
      // console.log(this.$refs.tagList.style)
      // console.log(document.getElementsByClassName('tagList')[0].style)
    // },
    ...mapMutations('menu', [
      '_tag'
    ]),
    ...mapActions('menu', [
      '_DelTag',
      '_DelAllTag',
      '_DelLeftTag',
      '_DelRightTag',
      '_DelOhterTag'
    ]),
    tabMoreClick (name) {
      if (name === 'closeAll') {
        this._DelAllTag()
      } else if (name === 'closeLeft') {
        this._DelLeftTag()
        this.tagCloseMove()
      } else if (name === 'closeRight') {
        this._DelRightTag()
        this.tagCloseMove()
      } else if (name === 'closeOther') {
        this._DelOhterTag()
        this.tagCloseMove()
      }
    },
    // 获取标签的二级菜单真实名称
    // getRealTagName (tagName) {
    //   if (parseInt(tagName) === -1) {
    //     return '首页'
    //   }
    //   tagName = tagName.split('-')
    //   return this.secondMenuList[tagName[0]][tagName[1]].list[tagName[2]].name
    // },
    // 关闭标签时 可视区域位置
    tagCloseMove () {
      setTimeout(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.moveToView(this.refsTag[0].$el)
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index - 1].$el
            this.moveToView(tag)
          }
        })
      }, 100)
    },
    closeTag (event, name) {
      this._DelTag(name)
    },
    mouseWheel (e) {
      e = e || window.event
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    // 鼠标滚轮滚动
    handlescroll (e) {
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      let left = 0
      if (delta > 0) {
        left = Math.min(10, this.tagBodyLeft + delta)
      } else {
        if (this.$refs.smyTagBox.offsetWidth - 100 < this.$refs.smyTagBody.offsetWidth) {
          if (this.tagBodyLeft < -(this.$refs.smyTagBody.offsetWidth - this.$refs.smyTagBox.offsetWidth)) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(this.tagBodyLeft + delta, this.$refs.smyTagBox.offsetWidth - this.$refs.smyTagBody.offsetWidth - 100)
          }
        } else {
          this.tagBodyLeft = 10
        }
      }
      this.tagBodyLeft = left
    },
    // 滚动至当前标签位置
    moveToView (tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.smyTagBox.offsetWidth - 100) {
          // 标签在可视区域
      } else {
          // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.smyTagBox.offsetWidth - 20 - tag.offsetWidth) + 20)
      }
    }
  },
  mounted () {
    this.refsTag = this.$refs.tagsPageOpened
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index - 1].$el
          this.moveToView(tag)
        }
      })
    }, 50) // 这里不设定时器就会有偏移bug
  }
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar{
  display:none;
}
.smy__tag-box {
  position: relative;
  padding-right: 110px;
  .smy__tab-list{
    display: flex;
    position: relative;
    align-items: center;
    overflow-y: hidden;
    width: 100%;
    height: 50px;
    padding-left: 10px;
    box-shadow: 0 2px 6px #EDEDED;
    .tagList {
      display: flex;
      flex-wrap: nowrap;
      position: absolute;
      box-sizing: border-box;
      transition: left 0.3s ease;
      top: 7px;

      .tag {
        position: relative;
        flex-shrink: 0;

        .tagName {
          position: absolute;
          background: transparent;
          width: 100%;
          height: 100%;
          left: 0;
        }
      }
    }
  }
  .close-all-tag-con {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 8px;
    text-align: center;
    width: 110px;
    height: 100%;
    background: #fff;
    box-shadow: -2px 2px 6px #ededed;
    z-index: 10;
  }
}
</style>
