<template lang="html">
  <!-- 查看图片 -->
  <div class="smy__card-full-box">
    <Card :bordered="false" class="smy__card-full">
      <AMapModal
        containerId="amap-modal-container"
        panelId="amap-modal-panel"
        v-model="isShowModal"
        @on-ok="getMessage = $event"
      />
      <Button @click="isShowModal = true">选择地址</Button>
      <br>
      <br>
      <div class="border">{{getMessage}}</div>
    </Card>
  </div>
</template>

<script>
import AMapModal from '@/components/AMapModal'

export default {
  components: {
    AMapModal
  },
  data () {
    return {
      isShowModal: false,
      getMessage: {}
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .border {
    border: 1px solid #ededed;
    height: 200px;
    width: 300px;
    padding: 20px;
  }
</style>
