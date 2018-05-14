<template lang="html">
  <!-- FAQ -->
  <div class="smy__card-full-box">
    <Card
      :bordered="false"
      class="smy__card-full"
    >
      <p slot="title">
          FAQ
      </p>
      <p slot="extra">
          FAQ
      </p>
      <div class="faq-card">
        <div class="faq-left">
          <!-- <div class="faq-left-button">
            <Button type="primary">创建</Button>
            <Button type="ghost">重命名</Button>
            <Button type="ghost">删除</Button>
          </div> -->
          <div class="faq-left-tree">
            <Tree
              :data="faqTree"
              :render="renderContent"
              @on-toggle-expand="toogle"
              :load-data="loadData"
            ></Tree>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      faqTree: [
        {
          title: '全部FAQ',
          loading: false,
          // 根节点因不存在删除节点操作，进行单独渲染
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px'
                }
              }, [
                h('Button', {
                  props: {
                    size: 'small',
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  },
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => this.append(data)
                  }
                })
              ])
            ])
          },
          children: [
            {
              title: '加载中...'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 节点的通用渲染方法 包含 节点图标、添加节点按钮、删除节点按钮
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        // 左侧
        h('span', [
          // 节点图标
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          data.title
        ]),
        // 右侧
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [
          // 添加节点按钮
          h('Button', {
            props: {
              type: 'ghost',
              size: 'small',
              icon: 'ios-plus-empty'
            },
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => this.append(data)
            }
          }),
          // 删除节点按钮
          h('Button', {
            props: {
              type: 'ghost',
              size: 'small',
              icon: 'ios-minus-empty'
            },
            on: {
              click: () => this.remove(root, node, data)
            }
          })
        ])
      ])
    },
    // 添加节点
    append (data) {
      // 展开状态才可添加节点 否则会导致异步加载失效
      if (data.expand) {
        const children = data.children || []
        children.push({
          title: '新文件',
          loading: false,
          children: []
        })
        // 当不存在children时push无绑定 需set
        this.$set(data, 'children', children)
      }
    },
    // 移除节点
    remove (root, node, data) {
      // 查询父节点的nodeKey
      const parentKey = root.find(el => el === node).parent
      // 查询父节点的node
      const parent = root.find(el => el.nodeKey === parentKey).node
      // 查询在父节点中的children中 目标节点的下标
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    // 异步加载节点
    loadData (node, callback) {
      setTimeout(() => {
        let data = [
          {
            title: '异步加载的节点',
            children: []
          }
        ]
        callback(data)
      }, 1000)
    },
    toogle (data) {
      // data.loading = true
    }
  }
}
</script>

<style lang="less" scoped>
.faq-card {
  display: flex;
  height: 100%;

  .faq-left {
    display: flex;
    flex-direction: column;
    height: 100%;

    .faq-left-button {

    }

    .faq-left-tree {
      height: 400px;
      border: 1px solid;
    }
  }
}
</style>
