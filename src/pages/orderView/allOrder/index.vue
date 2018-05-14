<template lang="html">
  <!-- 全部工单 -->
  <div class="smy__card-full-box">
    <Card
      :bordered="false"
      class="smy__card-full"
    >
      <p slot="title">
          全部工单
      </p>
      <p slot="extra">
        <span style="font-size: 12px; color: #80848F;">
          <span class="ivu-tag-dot-inner ivu-tag-green"></span>
          这里可以查看全部工单
        </span>
      </p>
      <div class="search">
        <!-- 粗略筛选条件、功能按钮、筛选列 -->
        <div class="search-top">
          <div class="search-top-left">
            <ButtonGroup>
              <Button type="primary"
                v-for="(typeName, index) in typeNameList"
                :key="typeName"
                @click="type = index"
                :type="type == index ? 'primary' : 'ghost'"
              >{{typeName}}</Button>
            </ButtonGroup>
            <Input
              placeholder="请输入工单关键字进行搜索"
              class="search-input"
              icon="ios-search"
            ></Input>
            <Button
              type="ghost"
              :icon="searchVisible ? 'minus-round' : 'plus-round'"
              @click="searchVisible = !searchVisible"
              class="search-button"
            >筛选</Button>
          </div>
          <div class="search-top-right">
            <Button
              type="primary"
              class="search-button"
            >重要操作</Button>
            <Poptip
            placement="bottom-end"
            width="150"
            >
            <Button
            type="default"
            class="search-button"
            >
            筛选列
            <Icon
            type="arrow-down-b"
            ></Icon>
          </Button>
          <div slot="content">
            <CheckboxGroup
            class="filter-column"
            v-model="columnsChecked"
            >
            <Checkbox label="title">标题</Checkbox>
            <Checkbox label="customName">预约人</Checkbox>
            <Checkbox label="takeOrderTime">预约时间</Checkbox>
            <Checkbox label="tmplName">工单模板</Checkbox>
            <Checkbox label="serviceName">服务项目</Checkbox>
            <Checkbox label="stateName">工单状态</Checkbox>
          </CheckboxGroup>
        </div>
      </Poptip>
      <Dropdown placement="bottom-end">
      <Button type="primary" class="search-button">
          更多
          <Icon type="arrow-down-b"></Icon>
      </Button>
      <DropdownMenu
        slot="list"
        trigger="click"
      >
          <DropdownItem>导出</DropdownItem>
          <DropdownItem>导入</DropdownItem>
        </DropdownMenu>
      </Dropdown>
            <!-- 展开筛选列 -->
          </div>
        </div>

        <!-- 详细筛选条件 -->
        <div>
          <div
            class="search-detail"
            :class="{'search-detail-close': !searchVisible}"
            :style="{overflow: !searchVisible ? 'hidden' : ''}"
          >
            <div class="search-detail-item">
              <Input
              class="search-input"
              placeholder="请输入标题"
              element-id="title"
              ></Input>
            </div>
            <div class="search-detail-item">
              <Input
                class="search-input"
                placeholder="请输入客户姓名"
                element-id="name"
              ></Input>
            </div>
            <div class="search-detail-item">
              <Input
                class="search-input"
                placeholder="请输入客户电话"
                element-id="tel"
              ></Input>
            </div>
            <div class="search-detail-item">
              <Select
                clearable
                filterable
                class="search-input"
                placeholder="请选择工单模板"
                element-id="orderType"
              >
                <Option
                  v-for="orderType in orderTypeList"
                  :key="orderType.id"
                  :value="orderType.id"
                >{{orderType.name}}
                </Option>
              </Select>
            </div>
            <div class="search-detail-item">
              <DatePicker
                class="search-input"
                type="daterange"
                :options="dateShortcut"
                placeholder="工单开始结束时间"
                element-id="date"
              ></DatePicker>
            </div>
            <div class="search-detail-item">
              <Select
                clearable
                filterable
                class="search-input"
                placeholder="请选择工单状态"
                element-id="status"
              >
                <Option
                  v-for="state in stateList"
                  :key="state.value"
                  :value="state.value"
                >{{state.name}}
                </Option>
              </Select>
            </div>
            <div class="search-detail-item">
              <Button
                type="primary"
                class="search-button"
              >查找</Button>
              <Button
                class="search-button"
              >重置</Button>
            </div>
          </div>
        </div>
      </div>

      <!-- 工单列表 -->
      <div class="table">
        <Table
          stripe
          :columns="columns"
          :data="orderList"
        ></Table>
      </div>
      <Page
        :total="100"
        show-total
        class="page"
        show-sizer
        :page-size-opts="[10, 20, 50, 100]"
      ></Page>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVisible: true, // 是否显示详细筛选条件
      type: 0,
      typeNameList: ['全部', '未指派', '已指派', '已取消'],
      // 工单模板下拉
      orderTypeList: [
        {
          id: 1,
          name: '模板一'
        }
      ],
      // 工单状态下拉
      stateList: [
        {
          name: '未派单',
          value: 1
        },
        {
          name: '未接单',
          value: 2
        },
        {
          name: '已接单',
          value: 3
        },
        {
          name: '服务中',
          value: 4
        },
        {
          name: '已完成',
          value: 5
        },
        {
          name: '已取消',
          value: 6
        }
      ],
      // 日期控件的快捷选择
      dateShortcut: {
        shortcuts: [
          {
            text: '今天',
            value () {
              const start = new Date()
              const end = new Date()
              return [start, end]
            }
          },
          {
            text: '昨天',
            value () {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              const end = start
              return [start, end]
            }
          },
          {
            text: '本周',
            value () {
              const start = new Date()
              start.setDate(start.getDate() - start.getDay() + 1)
              const end = new Date()
              return [start, end]
            }
          },
          {
            text: '本月',
            value () {
              const start = new Date()
              start.setDate(1)
              const end = new Date()
              return [start, end]
            }
          },
          {
            text: '上月',
            value () {
              const start = new Date()
              start.setDate(1)
              start.setMonth(start.getMonth() - 1)
              const end = new Date()
              end.setDate(0)
              return [start, end]
            }
          }
        ]
      },
      // 筛选列
      columnsChecked: [
        'title',
        'customName',
        'takeOrderTime',
        'tmplName',
        'serviceName',
        'stateName'
      ],
      // 列表数据
      orderList: [
        {
          orderNo: '123',
          title: '修电脑',
          customName: '小白',
          takeOrderTime: '2017-12-28 18:27',
          'tmpl_name': '电脑维修',
          'service_name': '没有',
          stateName: '已完成',
          priority: 1
        },
        {
          orderNo: '123',
          title: '修电脑',
          customName: '小白',
          takeOrderTime: '2017-12-28 18:29',
          'tmpl_name': '电脑维修',
          'service_name': '没有',
          stateName: '已完成',
          priority: 1
        },
        {
          orderNo: '123',
          title: '修电脑',
          customName: '小白',
          takeOrderTime: '2017-12-28 18:28',
          'tmpl_name': '电脑维修',
          'service_name': '没有',
          stateName: '已完成',
          priority: 1
        },
        {
          orderNo: '123',
          title: '修电脑',
          customName: '小白',
          takeOrderTime: '2017-12-28 18:21',
          'tmpl_name': '电脑维修',
          'service_name': '没有',
          stateName: '已完成',
          priority: 1
        },
        {
          orderNo: '123',
          title: '修电脑',
          customName: '小白',
          takeOrderTime: '2017-12-28 18:27',
          'tmpl_name': '电脑维修',
          'service_name': '没有',
          stateName: '已完成',
          priority: 1
        }
      ]
    }
  },
  computed: {
    // 表格列 根据选中的列动态生成
    columns () {
      const allColumns = {
        selection: {
          type: 'selection',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        orderNo: {
          title: '工单号',
          key: 'orderNo',
          width: 140,
          fixed: 'left'
        },
        title: {
          title: '标题',
          key: 'title',
          width: 140
          // render: (h, { row }) => {
          //   let priority = row.priority
          //   let priorityName = ''
          //   let color = ''
          //   if (priority === 1) {
          //     priorityName = '一般'
          //     color = 'green'
          //   } else if (priority === 2) {
          //     priorityName = '紧急'
          //     color = 'red'
          //   }
          //
          //   return h('div', {}, [
          //     h('Tag', {
          //       props: {
          //         type: 'border',
          //         color
          //       }
          //     }, priorityName),
          //     row.title
          //   ])
          // }
        },
        // priority: {
        //   title: '优先级',
        //   key: 'priority',
        //   width: 140
        // },
        customName: {
          title: '预约人',
          key: 'customName',
          width: 140
        },
        takeOrderTime: {
          title: '预约时间',
          key: 'takeOrderTime',
          width: 140,
          sortable: true
        },
        tmplName: {
          title: '工单模板',
          key: 'tmpl_name',
          width: 140
        },
        serviceName: {
          title: '服务项目',
          key: 'service_name',
          width: 140
        },
        stateName: {
          title: '工单状态',
          key: 'stateName',
          width: 140
        },
        none: {
          title: ' ',
          key: ' '
        },
        options: {
          title: '操作',
          width: 140,
          fixed: 'right',
          render: (h, { row }) => {
            return h('span', [
              h('Button', {
                props: {
                  type: 'ghost',
                  size: 'small'
                }
              }, ['编辑']),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                }
              }, ['删除'])
            ])
          }
        }
      }
      // let sortColumns = [
      //   'title',
      //   'customName',
      //   'takeOrderTime',
      //   'tmplName',
      //   'serviceName',
      //   'stateName'
      // ]
      let columns = [allColumns.selection, allColumns.orderNo, allColumns.options]
      this.columnsChecked.forEach(col => columns.push(allColumns[col]))
      columns.push(allColumns.none)
      return columns
    }
  },
  created () {
    this.$http.get('/').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
.search {
  .search-top {
    display: flex;
    justify-content: space-between;

    .search-top-left {
      display: flex;
      width: 70%;

      .search-input {
        width: 40%;

        margin-left: 10px;
      }

      .search-button {
        margin-left: 10px;
      }
    }

    .search-top-right {
      .filter-column {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .search-button {
        margin-left: 6px;
      }
    }
  }

  .search-detail {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    height: 90px;
    transition: .5s;

    .search-detail-item {
      width: 24.25%;

      .search-input {
        width: 100%;
      }

      .search-button {
        margin-right: 6px;
      }
    }

    .search-detail-item:nth-child(2n+1),
    .search-detail-item:nth-child(4n+2) {
      margin-right: 1%;
    }
  }

  .search-detail-close {
    height: 0;
    opacity: 0;
  }
}

.page {
  margin-top: 20px;
}
</style>
