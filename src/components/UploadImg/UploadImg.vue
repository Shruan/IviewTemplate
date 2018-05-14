<template lang="html">
  <div class="shy__upload-img">
    <div class="demo-upload-list"
      v-for="(item, index) in uploadList"
      :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      multiple
      type="drag"
      ref="uploadImg"
      action="/upload/save"
      class="upload-body"
      :max-size="5120"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="['jpg', 'jpeg', 'png', 'bmp', 'tiff']"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload">
      <div style="width: 80px;height:80px;line-height: 80px; padding-top: 3px;">
        <Icon
          type="ios-plus-empty"
          size="28"
          style="color: #80848F;"
        />
      </div>
    </Upload>
    <Modal title="查看大图" v-model="visible">
      <img :src="url" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    // multiple: {
    //   type: Boolean,
    //   default: false
    // },
    // 图片上传上限
    num: {
      type: Number,
      default: 3
    },
    // 是否覆盖 开启后 最后上传的图片会覆盖最先上传的图片
    override: {
      type: Boolean,
      default: false
    },
    // 默认展示图片
    defaultList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      uploadList: [],
      visible: false,
      url: ''
    }
  },
  watch: {
    uploadList: {
      handler (val) {
        this.$emit('on-change', val)
        let urlList = val.map(item => item.url)
        if (urlList.indexOf(undefined) === -1) {
          this.$emit('on-change-url', urlList)
        }
      },
      deep: true
    },
    defaultList: {
      handler () {
        this.setDefaultList()
      }
    }
  },
  methods: {
    handleView (url) {
      this.url = url
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.uploadImg.fileList
      this.$refs.uploadImg.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess ({ data }, file) {
      file.url = data.fileUrl + data.files
      file.name = data.files
      this.uploadList = this.$refs.uploadImg.fileList
      this.$Message.success('上传成功')
    },
    handleError () {
      this.$Message.error('上传失败')
    },
    handleFormatError (file) {
      this.$Message.error('文件格式不支持')
    },
    handleMaxSize (file) {
      this.$Message.error('图片大小超出限制')
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.num
      if (!this.override) {
        // 关闭覆盖功能后 超出数量提示
        if (!check) {
          this.$Message.error(`图片数量超过${this.num}张`)
        }
        return check
      } else {
        // 开启覆盖功能后 超过上限时 新上传的图片会替换最早的图片
        if (!check) {
          this.uploadList.splice(0, 1)
        }
        return true
      }
    },
    setDefaultList () {
      this.uploadList = []
      this.$refs.uploadImg.fileList = []
      for (let pic of this.defaultList) {
        if (pic) {
          let data = {
            url: pic,
            status: 'finished'
          }
          this.uploadList.push(data)
          this.$refs.uploadImg.fileList.push(data)
        }
      }
    }
  },
  mounted () {
    this.setDefaultList()
  }
}
</script>

<style lang="css" scoped>
  .upload-body {
    display: inline-block;
    width:80px;
    height:80px;
  }
  .demo-upload-list{
    display: inline-block;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    /* box-shadow: 0 1px 1px rgba(0,0,0,.2); */
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
