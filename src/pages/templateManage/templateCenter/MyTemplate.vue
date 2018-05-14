<template lang="html">
  <!-- 模板中心-我的模板 -->
  <div class="">
    <Tabs value="name1">
        <TabPane label="模板列表" name="name1">
          <div class="template-list">
            <Card class="template">
              <div class="template-content">
                <div class="template-img">
                </div>
                <div class="template-text">
                  <div class="template-text-top">
                    <div class="template-text-top-left">
                      模板标题
                    </div>
                    <div class="template-text-top-right">
                      模板标题
                    </div>
                  </div>
                  <div class="template-text-middle">
                    <Button type="primary" size="small">应用</Button>
                    <Button type="ghost" size="small">label</Button>
                    <router-link :to="{ name: 'ProcessSetting', params: {} }">
                      <Button type="ghost" size="small">流程设置</Button>
                    </router-link>
                  </div>
                  <div class="template-text-bottom">
                    这里是一大断描述这里是一大断描述这里是一大断描述这里是一大断描述
                  </div>
                </div>
              </div>
            </Card>
            <Card class="template">
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </Card>
            <Card class="template">
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </Card>
          </div>
          <Page
            :total="100"
            show-total
            class="page"
            show-sizer
          ></Page>
        </TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../../../assets/whole';

.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .template {
    flex-shrink: 0;
    width: 49%;
    // margin-right: 16px;
    margin-bottom: 21px;
    height: 127px;
    border-left: 1px solid @primary-color;

    .template-content {
      display: flex;

      .template-img {
        flex-shrink: 0;
        height: 100px;
        width: 100px;
        // background: #F8F8F9;
        background: #CCC;
      }

      .template-text {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 19px;

        .template-text-top {
          display: flex;
          justify-content: space-between;

          .template-text-top-left {
            color: #405060;
          }

          .template-text-top-right {
            color: #80848F;
          }
        }

        .template-text-middle {
          margin-top: 10px;
        }

        .template-text-bottom {
          margin-top: 10px;
          color: #80848F;
        }
      }
    }
  }

  .page {
    // display: inline-block;
  }
}
</style>
