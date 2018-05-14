<template lang="html">
  <!-- 流程设置 -->
  <div class="smy__card-full-box">
    <Card
      :bordered="false"
      class="smy__card-full"
    >
      <p slot="title">
          流程设置
      </p>
      <p slot="extra">
          流程设置
      </p>
      <div>
        <Carousel dots="none">
          <CarouselItem>
            <div class="process-step process-step-first">
              <div class="process-step-circle">
                1
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="process-step process-step-second">2</div>
          </CarouselItem>
        </Carousel>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../../../assets/whole';

.process-step {
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-step-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: #8CDFB5;
  border: 1px solid #FFF;
  border-radius: 13px;
}

.process-step-first {
  height: 80px;
  background: -webkit-linear-gradient(left, @primary-color , @half-of-process-color); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, @primary-color, @half-of-process-color); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, @primary-color, @half-of-process-color); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, @primary-color , @half-of-process-color); /* 标准的语法 */
}

.process-step-second {
  height: 80px;
  background: -webkit-linear-gradient(left, @half-of-process-color , @process-color); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, @half-of-process-color, @process-color); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, @half-of-process-color, @process-color); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, @half-of-process-color , @process-color); /* 标准的语法 */
}
</style>
