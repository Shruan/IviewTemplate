<template lang="html">
  <div class="icon-edit">
    <Modal
      @on-visible-change="$emit('input', $event)"
      v-model="isShow"
      title="图标编辑"
      :width="700"
      :loading="loading"
      @on-ok="submit">
      <div class="modal-box">
        <div class="upload-part">
          <div class="upload-image-box">
            <div class="image" :style="`background-image: url(${logo})`"></div>
          </div>
          <div class="upload-image-describe">
            <div class="">
              <p>建议图片长宽比 1:1</p>
              <p>大小不超过1M</p>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              :format="['jpg', 'jpeg', 'png', 'bmp', 'tiff']"
              :max-size="1024"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              action="/upload/save">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          </div>
        </div>
        <label class="label">选择单小二提供的图标库来美化您的{{tipLabel}}</label>
        <Tabs type="card">
          <TabPane label="行业通用" class="modal-tabs">
            <p>行业通用 - 扁平化圆角图标</p>
            <ul class="all-icon-box" v-for="n in 4">
              <li v-for="item in iconListPage" :key="item" @click="selectIcon(item, n-1)">
                <img
                  class="icon"
                  :class="{'icon-select': logo === `${logoPrefix}/template-${item}-${n-1}.png`}"
                  :src="`${logoPrefix}/template-${item}-${n-1}.png`"
                  />
              </li>
            </ul>
            <Page
              :total="44"
              show-total
              :page-size="28"
              :current.sync="current"
              />
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    },
    selectLogo: {
      type: String
    },
    tipLabel: {
      type: String,
      default: '企业门户'
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      logoPrefix: '/spa_static/templateIcon',
      logo: '',
      iconList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      current: 1
    }
  },
  computed: {
    iconListPage () {
      return this.iconList.slice((this.current - 1) * 7, this.current * 7)
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    selectLogo (val) {
      this.logo = val
    }
  },
  methods: {
    selectIcon (id, color) {
      this.logo = `${this.logoPrefix}/template-${id}-${color}.png`
    },
    handleBeforeUpload () {

    },
    handleFormatError (file) {
      this.$Message.error('文件格式不支持')
    },
    handleMaxSize (file) {
      this.$Message.error('图片大小超出限制')
    },
    handleError () {
      this.$Message.error('上传失败')
    },
    handleSuccess ({ data }, file) {
      file.url = data.fileUrl + data.files
      file.name = data.files
      this.logo = file.url
      this.$Message.success('上传成功')
    },
    submit () {
      this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 50)
      if (this.logo) {
        this.$emit('on-ok', this.logo)
        this.isShow = false
      } else {
        this.$Message.error('请选择图标')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .modal-box {
    color: #80848F;

    .upload-part {
      display: flex;

      .upload-image-box {
        width: 80px;
        height: 80px;
        border: 1px solid #ededed;
        margin-right: 10px;

        .image {
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          width: 100%;
          height: 100%;
        }
      }
      .upload-image-describe {
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-content: space-between;
      }
    }

    .label {
      line-height: 45px;
    }

    .modal-tabs {
      p {
        color: #80848F;
        line-height: 30px;
      }

      .all-icon-box {
        height: 90px;
        display: flex;
        align-items: center;
        // flex-wrap: wrap;

        li {
          margin-right: 10px;
          height: 90px;
          width: 90px;
          // border: 1px solid #ededed;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            width: 80px;
            height: 80px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: auto;
          }

          .icon-select {
            border: 1px solid #63D5B8;
            box-shadow: 0 0 0 2px #D8F5ED;
          }
        }

        li:last-child {
          margin-right: 0;
        }
      }
    }

  }
</style>
