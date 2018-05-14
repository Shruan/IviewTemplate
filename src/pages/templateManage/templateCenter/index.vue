<template lang="html">
  <!-- 模板中心 -->
  <div class="smy__card-full-box">
    <Card
      :bordered="false"
      class="smy__card-full"
    >
      <p slot="title">
          模板中心
      </p>
      <p slot="extra">
          模板中心
      </p>
      <div class="template-card">
        <div
          class="card-all"
          :class="{
            'card-two-position': cardIndex == 1,
            'card-one-position': cardIndex == 2,
            'card-three-position': cardIndex == 3
          }"
          @click="cardIndex = 1"
        >
          <Icon
            type="social-octocat"
            size="72"
          ></Icon>
          <div class="card-name">
            我的模板
          </div>
          <div class="card-discription">
            根据企业自身需求编辑自己的模板组合
          </div>
        </div>
        <div
          class="card-all"
          :class="{
            'card-three-position': cardIndex == 1,
            'card-two-position': cardIndex == 2,
            'card-one-position': cardIndex == 3
          }"
          @click="cardIndex = 2"
        >
          <Icon
            type="social-snapchat"
            size="72"
          ></Icon>
          <div class="card-name">
            选择应用模板
          </div>
          <div class="card-discription">
            在模板库中挑选单小二为您提供的行业通用模板
          </div>
        </div>
        <div
          class="card-all"
          :class="{
            'card-one-position': cardIndex == 1,
            'card-three-position': cardIndex == 2,
            'card-two-position': cardIndex == 3
          }"
          @click="cardIndex = 3"
        >
          <Icon
            type="ios-nutrition"
            size="72"
          ></Icon>
          <div class="card-name">
            企业定制模板
          </div>
          <div class="card-discription">
            联系我们定制企业专属模板<br>
            客服热线：0592-3278627
          </div>
        </div>
      </div>
      <div class="template-tabs">
        <transition name="slider-left">
          <MyTemplate v-show="cardIndex == 1" class="slider"/>
        </transition>
      </div>
    </Card>
  </div>
</template>

<script>
import MyTemplate from './MyTemplate'

export default {
  components: {
    MyTemplate
  },
  data () {
    return {
      cardIndex: 1 // 当前选中的卡片
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/whole';

.template-card {
  display: flex;
  height: 200px;

  .card-all {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    padding-top: 40px;
    color: #FFF;
    transition: .5s;
    height: 200px;
    width: 33.33%;

    .card-name {
      font-size: 20px;
    }
    .card-discription {
    }
  }

  .card-all:hover {
    cursor: pointer;
  }

  .card-one-position {
    background: -webkit-linear-gradient(left, @primary-color , @thrid-of-process-color); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, @primary-color, @thrid-of-process-color); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, @primary-color, @thrid-of-process-color); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, @primary-color , @thrid-of-process-color); /* 标准的语法 */
    left: 0px;
    z-index: 2;
    opacity: 0.8;
  }

  .card-two-position {
    background: -webkit-linear-gradient(left, @thrid-of-process-color , @two-thrids-of-process-color); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, @thrid-of-process-color, @two-thrids-of-process-color); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, @thrid-of-process-color, @two-thrids-of-process-color); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, @thrid-of-process-color , @two-thrids-of-process-color); /* 标准的语法 */
    left: 33.33%;
    transform: scale(1.2);
    z-index: 3;
  }

  .card-three-position {
    background: -webkit-linear-gradient(left, @two-thrids-of-process-color , @process-color); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, @two-thrids-of-process-color, @process-color); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, @two-thrids-of-process-color, @process-color); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, @two-thrids-of-process-color , @process-color); /* 标准的语法 */
    left: 66.66%;
    z-index: 1;
    opacity: 0.8;
  }
}

.template-tabs {
  margin-top: 30px;
}
</style>
