<template lang="html">
  <!-- 查看图片 -->
  <div class="smy__card-full-box">
    <Card :bordered="false" class="smy__card-full">
      <PicsCheckModal
        :pics="picList"
        :index="picIndex"
        v-model="isShowPicsModal"
      />
      <Button @click="isShowPicsModal = true">查看图片</Button>
    </Card>
  </div>
</template>

<script>
import PicsCheckModal from '@/components/PicsCheckModal'

export default {
  components: {
    PicsCheckModal
  },
  data () {
    return {
      isShowPicsModal: false,
      picIndex: 0,
      picList: [
        'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg',
        'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg',
        'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
