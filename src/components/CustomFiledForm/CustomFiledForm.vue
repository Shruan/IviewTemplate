<template>
  <div class="custom-field">
    <Form
      ref="customFormRef"
      :model="customList"
      :label-width="labelWidth"
      :label-position="labelPosition">
      <FormItem
        v-for="(item, index) in customList.customField"
        :key="item.id"
        :prop="customRulePropFuc(item, index)"
        :rules="customRuleFuc(item)"
        :label="item.name"
        v-if="item.is_view === 1"
        >
        <!-- type 1 , 12 输入框字符串 -->
        <Input
          :placeholder="`请输入${item.name}`"
          v-if="item.type === 1 || item.type === 12"
          v-model="item.tfvvalue"
          @on-change="vueSet(customList.customField[index].tfvvalue, index)"
        />

        <!-- type 2 输入框数字类型 -->
        <Input
          :placeholder="`请输入${item.name},必须是数字类型`"
          v-if="item.type === 2 "
          v-model="item.tfvvalue"
          @on-change="vueSet(customList.customField[index].tfvvalue, index)"
        />

        <!-- type 3 下拉框 -->
        <Select
          transfer
          v-if="item.type === 3"
          v-model="item.ovalue"
          style="width: 100%"
          @on-change="vueSet($event, index)"
        >
          <Option
            v-for="obj in item.dropList"
            :key="obj.id"
            :value="obj.id + ''"
          >{{obj.value}}</Option>
        </Select>

        <!-- type 4 日期 -->
        <DatePicker
          transfer
          type="date"
          style="width: 100%"
          v-if="item.type === 4"
          :placeholder="`请选择${item.name}`"
          v-model="item.tfvvalue"
          @on-change="vueSet($event, index)"
        />

        <!-- type 5 时间选择器 -->
        <TimePicker
          transfer
          type="time"
          style="width: 100%"
          format="HH:mm"
          v-if="item.type === 5"
          v-model="item.tfvvalue"
          :placeholder="`请选择${item.name}`"
          @on-change="vueSet($event, index)"
        />

        <!-- type 6 日期时间选择器 -->
        <DatePicker
          transfer
          type="datetime"
          v-if="item.type === 6"
          :placeholder="`请选择${item.name}`"
          v-model="item.tfvvalue"
          @on-change="vueSet($event, index)"
          style="width: 100%"
        />

        <!-- type 7 开关 -->
        <Switch
          v-if="item.type === 7"
          v-model="item.ovalue"
          @on-change="vueSet($event, index)"
        />

        <!-- type 8 多选 -->
        <CheckboxGroup
          v-if="item.type === 8"
          v-model="item.ovalue"
          @on-change="vueSet($event, index)"
        >
          <Checkbox
            :label="obj.id"
            v-for="obj in item.dropList"
            :key="obj.id">
            {{obj.value}}
          </Checkbox>
        </CheckboxGroup>

        <!-- type 9 级联地址 -->
        <AddressCascade
          :placeholder="`请选择${item.name}`"
          v-model="item.addrList"
          v-if="item.type === 9"
          @on-change="vueSet($event, index)"
        />

        <!-- type 10 图片选择 -->
        <UploadImg
          v-if="item.type === 10"
          v-model="item.tfvvalue"
          :defaultList="item.imgValue"
          @on-change-url="vueSet($event, index)"
        />

        <!-- type 11 定位组件 -->
        <div v-if="item.type === 11" @click="vueSet($event, index)">
          <Input
            v-if="item.type === 11"
            v-model="item.ovalue"
            placeholder="请点击右侧按钮定位"
            disabled
          >
            <Button slot="append" type="ghost" @click="vueSet($event, index)">
              <Icon style="font-size: 15px;" type="ios-location-outline"/>
            </Button>
          </Input>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import AddressCascade from '@/components/AddressCascade'
import UploadImg from '@/components/UploadImg'
export default {
  components: {
    AddressCascade,
    UploadImg
  },
  props: {
    // 传入表单值 数组格式
    fieldList: {
      type: Array,
      required: true
    },
    // 表单label标签宽度
    labelWidth: {
      type: Number,
      default: 120
    },
    labelPosition: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      customList: {
        customField: []
      },
      customRuleValidate: {},
      list: []
    }
  },
  watch: {
    // 数据遍历 深度拷贝
    fieldList (val) {
      console.log(val)
      val.forEach(v => {
        if (!v.ovalue) {
          if (v.type === 3) {
            v.ovalue = ''
          } else if (v.type === 7) {
            v.ovalue = false
          } else {
            if (v.type === 9) {
              v.addrList = []
            }
            v.ovalue = []
          }
        } else {
          if (v.type !== 3 && v.type !== 7) {
            if (v.type === 8) {
              v.ovalue = v.ovalue.split(',')
              v.ovalue.forEach((val, index) => {
                v.ovalue[index] = Number(val)
              })
            } else {
              v.ovalue = v.ovalue.split(',')
              if (v.type === 9) {
                v.addrList = v.ovalue
              }
            }
          } else {
            if (v.type === 7) {
              if (Number(v.ovalue) === 1) {
                v.ovalue = true
              } else {
                v.ovalue = false
              }
            }
          }
        }
        if (!v.tfvvalue) {
          if (v.type === 10) {
            v.tfvvalue = []
            v.imgValue = []
          } else {
            v.tfvvalue = ''
          }
        } else {
          if (v.type === 10) {
            v.tfvvalue = v.tfvvalue.split(',')
            v.imgValue = v.tfvvalue
          } else if (v.type === 5) {
            v.tfvvalue = v.tfvvalue
          } else if (v.type === 6) {
            v.tfvvalue = new Date(v.tfvvalue).Format('yyyy-MM-dd hh:mm:ss')
          } else if (v.type === 11) {
            v.ovalue = v.tfvvalue.split(',')[0]
          }
        }
      })
      this.customList.customField = []
      val.forEach(val => {
        let temp = {}
        for (let obj in val) {
          if (obj === 'dropList') {
            let arr = []
            val[obj].forEach(val2 => {
              let temp2 = {}
              for (let obj2 in val2) temp2[obj2] = val2[obj2]
              arr.push(temp2)
            })
            temp[obj] = arr
          } else {
            temp[obj] = val[obj]
          }
        }
        this.customList.customField.push(temp)
      })
      // console.log(this.customList)
    },
    // 监听表单变化
    'customList.customField': {
      handler (val) {
        let arr = []
        val.forEach(val => {
          let obj = {}
          obj.id = val.id
          obj.type = val.type
          if (val.type === 3 || val.type === 8 || val.type === 9) {
            if (val.type === 3) {
              obj.value = val.ovalue
            } else {
              obj.value = val.ovalue.join(',')
            }
          } else if (val.type === 7) {
            if (val.ovalue) {
              obj.value = 1
            } else {
              obj.value = 0
            }
          } else if (val.type === 4 || val.type === 5 || val.type === 6) {
            if (val.tfvvalue) {
              if (val.type === 4) {
                obj.value = new Date(val.tfvvalue).Format('yyyy-MM-dd')
              } else if (val.type === 5) {
                obj.value = val.tfvvalue
              } else {
                obj.value = new Date(val.tfvvalue).Format('yyyy-MM-dd hh:mm')
              }
            } else {
              obj.value = ''
            }
          } else if (val.type === 10) {
            obj.value = val.tfvvalue.join(',')
          } else {
            obj.value = val.tfvvalue
          }
          arr.push(obj)
        })
        this.$emit('on-change', arr)
      },
      deep: true
    }
  },
  methods: {
    // 表单验证prop
    customRulePropFuc (item, index) {
      if (item.type === 3 || item.type === 7 || item.type === 8 || item.type === 9) {
        return 'customField[' + index + '].ovalue'
      } else {
        return 'customField[' + index + '].tfvvalue'
      }
    },
    // 表单验证规则
    customRuleFuc (item) {
      const validateMobile = (rule, value, callback) => {
        if (!Number.isInteger(+value)) {
          callback(new Error('必须是数字类型'))
        } else {
          callback()
        }
      }
      if (item.type === 2) {
        if (item.is_required === 1) {
          return [
            { required: item.is_required === 1, message: `${item.name}必填`, trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        } else {
          return { validator: validateMobile, trigger: 'blur' }
        }
      } else if (item.type === 1 || item.type === 12) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, message: `${item.name}必填`, trigger: 'blur' }
        }
      } else if (item.type === 4 || item.type === 5 || item.type === 6) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, type: 'date', message: `${item.name}必选`, trigger: 'change' }
        }
      } else if (item.type === 3) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, message: `${item.name}必选`, trigger: 'change' }
        }
      } else if (item.type === 8) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, type: 'array', message: `${item.name}至少选一个`, trigger: 'change' }
        }
      } else if (item.type === 9 || item.type === 10) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, type: 'array', message: `${item.name}必选`, trigger: 'change' }
        }
      } else if (item.type === 7) {
        if (item.is_required === 1) {
          return { required: item.is_required === 1, message: `${item.name}必填` }
        }
      }
    },
    // 表单验证事件
    handleSubmit () {
      this.$refs.customFormRef.validate((valid) => {
        if (valid) {
          this.$emit('isValidate', true)
        } else {
          this.$emit('isValidate', false)
        }
      })
    },
    // 初始化表单
    resetFormFieldds () {
      this.$refs.customFormRef.resetFields()
    },
    // 表单on-change事件赋值
    vueSet (val, index) {
      let obj = this.customList.customField[index]
      if (obj.type === 1 || obj.type === 12 || obj.type === 2 || obj.type === 4 || obj.type === 5 || obj.type === 6 || obj.type === 10) {
        obj.tfvvalue = val
        // console.log(obj.tfvvalue)
      } else if (obj.type === 11) {
        this.getPosition(item => {
          obj.tfvvalue = `${item.address},${item.address},${item.longitude},${item.latitude}`
          obj.ovalue = item.address
        })
      } else {
        obj.ovalue = val
      }
      this.$set(this.customList.customField, index, obj)
    },
    // 定位
    getPosition (callback) {
      // ip 定位 获取开始服务相关信息
      let url = 'https://restapi.amap.com/v3/ip?ip=&output=xml&key=cfa87b97f9be63bbe53fac563524f28b'
      this.$http.post(url).then(res => {
        let rectangle = res.rectangle.split(';')
        let position1 = rectangle[0].split(',')
        let position2 = rectangle[1].split(',')
        let longitude = ((Number(position1[0]) + Number(position2[0])) / 2).toFixed(7)
        let latitude = ((Number(position1[1]) + Number(position2[1])) / 2).toFixed(8)
        let center = [longitude, latitude]
        let url1 = `https://restapi.amap.com/v3/geocode/regeo?key=cfa87b97f9be63bbe53fac563524f28b&location=${center.join(',')}&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0`
        this.$http.all([
          this.$http.get(url1)
        ]).then(this.$http.spread((res1) => {
          let data = {
            longitude: center[0],
            latitude: center[1],
            address: res1.regeocode.formatted_address
          }
          callback(data)
        }))
      })
    }
  }
}
</script>

<style lang="less">
.custom-field {
  // margin-right: 15px;
}
</style>
