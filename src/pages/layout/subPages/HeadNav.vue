<template lang="html">
  <!-- 头部导航栏 -->
  <div class="smy__nav-box">
    <Col span="10">
      <div class="smy__nav-left">
        <div @click="_isVisibleSecondMenu">
          <Icon
            type="navicon"
            size="26"
            class="icon"
            :class="{'icon-rotate': !isVisibleSecondMenu}"
          ></Icon>
        </div>
        <Breadcrumb class="breadcrumb">
          <template v-for="(breadcrumb, index) in breadcrumbList">
            <BreadcrumbItem v-if="index == breadcrumbList.length - 1">
              {{breadcrumb.name}}
            </BreadcrumbItem>
            <BreadcrumbItem v-else :to="{name: 'ApplicationTemplate'}">
              {{breadcrumb.name}}
            </BreadcrumbItem>
          </template>
          <!-- <BreadcrumbItem to="/components/breadcrumb">一个</BreadcrumbItem>
          <BreadcrumbItem>两个</BreadcrumbItem> -->
        </Breadcrumb>
      </div>
    </Col>
    <Col span="14">
      <div class="smy__nav-right">
        <Dropdown trigger="click" placement="bottom-end">
          <a href="javascript:void(0)" class="avatar">
            <Avatar
            icon=""
            style="background: #F5F7F9;"
            />
            <div class="avatar-text">
              <div class="avatar-text-first">
                小明
              </div>
              <div class="avatar-text-second">
                管理员
              </div>
            </div>
            <Icon
            type="arrow-down-b"
            class="nav-icon"
            ></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>菜单</DropdownItem>
            <DropdownItem disabled>禁止的菜单</DropdownItem>
            <DropdownItem divided>带横线的菜单</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Icon
          type="ios-help-outline"
          size="26"
          class="nav-icon"
        ></Icon>
        <Icon
          type="ios-bell-outline"
          size="26"
          class="nav-icon"
        ></Icon>
        <Icon
          type="ios-telephone-outline"
          size="26"
          class="nav-icon"
        ></Icon>
        <Input
        placeholder="Enter something..."
        icon="ios-search"
        class="nav-input nav-icon"
        ></Input>
      </div>
    </Col>
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
      'breadcrumbList',
      'isVisibleSecondMenu'
    ])
  },
  methods: {
    ...mapMutations('menu', [
      '_isVisibleSecondMenu'
    ])
  }
}
</script>

<style lang="less" scoped>
.smy__nav-box {
  height: 67px;
  display: flex;
  background: #FFF;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px #EDEDED;

  .smy__nav-left {
    display: flex;
    align-items: center;

    .icon {
      margin: 0 15px 0 15px;
      transition: .5s;
      color: #80848F;
    }

    .icon:hover {
      cursor: pointer;
    }

    .icon-rotate {
      transform:rotate(-90deg);
    }
  }

  .smy__nav-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    // margin-right: 20px;

    .nav-icon {
      margin-right: 20px;
      color: #80848F;
    }

    @media screen and (min-width: 1339px) {
      .nav-input {
        width: 400px;
      }
    }

    .avatar {
      display: flex;
      align-items: center;
      color: #405060;

      .avatar-text {
        margin-left: 15px;
        width: 85px;

        .avatar-text-first{
          font-size: 14px;
        }

        .avatar-text-second{
          font-size: 12px;
        }
      }
    }

  }
}
</style>
