<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="add">
          <p
            class="table_title"
            style="text-align: left; margin-left: 5px"
            v-text="title"
          ></p>
          <div class="selectProvince" >
            <el-select
              ref="select"
              id="sel"
              v-model="province.name"
              placeholder="请选择省份"
              v-if="showProSel"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value + '  ' + item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.label
                }}</span>
              </el-option>
            </el-select>
          </div>

          <div class="tagInput">
            <el-input
              ref="text"
              id="inp"
              style=""
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入该省份标签"
              v-model="province.tags"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </div>
          <div class="footer">
            <el-button
              type="success"
              @click="addProv"
              v-text="btnVal"
            ></el-button>
            &nbsp;&nbsp;<el-link type="primary" target="_blank" @click="goback"
              >返回</el-link
            >
          </div>
        </div>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="4">
        <div>
          <img class="logoimg" src="../../assets/Logo.jpg" alt="" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Addprovince",
  data() {
    return {
      options: [
        { label: "Beijing", value: "北京", disabled: false },
        { label: "Shandong", value: "山东", disabled: false },
        { label: "Anhui", value: "安徽", disabled: false },
        { label: "Fujian", value: "福建", disabled: false },
        { label: "Gansu", value: "甘肃", disabled: false },
        { label: "Guangdong", value: "广东", disabled: false },
        { label: "Guangxi", value: "广西", disabled: false },
        { label: "Guizhou", value: "贵州", disabled: false },
        { label: "Hainan", value: "海南", disabled: false },
        { label: "Hebei", value: "河北", disabled: false },
        { label: "Henan", value: "河南", disabled: false },
        { label: "Heilongjiang", value: "黑龙江", disabled: false },
        { label: "Hubei", value: "湖北", disabled: false },
        { label: "Hunan", value: "湖南", disabled: false },
        { label: "Jilin", value: "吉林", disabled: false },
        { label: "Jiangsu", value: "江苏", disabled: false },
        { label: "Jiangxi", value: "江西", disabled: false },
        { label: "Liaoning", value: "辽宁", disabled: false },
        { label: "Inner Mongoria", value: "内蒙古自治区", disabled: false },
        { label: "Ningxia", value: "宁夏", disabled: false },
        { label: "Qinghai", value: "青海", disabled: false },
        { label: "Taiwan", value: "台湾", disabled: false },
        { label: "Shanxi", value: "山西", disabled: false },
        { label: "Shaanxi", value: "陕西", disabled: false },
        { label: "Shanghai", value: "上海", disabled: false },
        { label: "Sichuan", value: "四川", disabled: false },
        { label: "Tianjing", value: "天津", disabled: false },
        { label: "Tibet", value: "西藏", disabled: false },
        { label: "Xinjiang", value: "新疆", disabled: false },
        { label: "Yunnan", value: "云南", disabled: false },
        { label: "Zhejiang", value: "浙江", disabled: false },
        { label: "Chongqing", value: "重庆", disabled: false },
        { label: "Macao", value: "澳门", disabled: false },
        { label: "Hong Kong", value: "香港", disabled: false },
      ],
      province: {
        id: "",
        name: "",
        tags: "",
        placecounts: "",
      },
      btnVal: "添 加",
      title: "添加省份",
      showProSel:false,//控制下拉框的启动
    };
  },
  methods: {
    goback() {
      this.$router.push("/home/provincelist");
    },
    addProv() {
      if (this.province.name == "" && this.province.tags == "") {
        this.$message.error("请选择省份！请输入标签！");
        return;
      }
      if (this.province.name == "") {
        this.$message.error("请选择省份！");
        return;
      }
      if (this.province.tags == "") {
        this.$message.error("请输入标签！");
        return;
      }
      if (this.title == "添加省份") {
        this.$axios.post("/province/save", this.province).then((res) => {
          // console.log(this.province);
          // console.log(res);
          if (res.data.state) {
            this.$message({
              message: "新省份信息添加成功！",
              type: "success",
            });
            this.$router.push("/home/provincelist");
          } else {
            this.$message.error("网络或服务器错误！");
          }
        });
      } else {
        //修改省份
        this.$confirm("此操作将修改原省份信息，不可恢复！", "提示", {
          confirmButtonText: "修改",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios.post("/province/update", this.province).then((res) => {
              console.log(this.province);
              console.log(res);
              if (res.data.state) {
                this.$message({
                  message: "省份信息修改成功！",
                  type: "success",
                });
                this.$router.push("/home/provincelist");
              } else {
                this.$message.error("网络或服务器错误！");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    filterOptions() {
      //筛选下拉框的可选项目
      var _this = this;
      this.$axios.get("/province/findByPage?rows=35").then((res) => {
        console.log(res);
        //遍历已有省份名
        for (let i = 0, len = res.data.totals; i < len; i++) {
          var provinceName = res.data.provinces[i].name;
          //console.log("provinces[" + i + "]=" + provinceName);
          //遍历所有省份名进行匹配
          for (let j = 0, len2 = _this.options.length; j < len2; j++) {
            if (provinceName == _this.options[j].value) {
              //console.log("match=" + provinceName);
              _this.options[j].disabled = true;
            }
          }
        }
        // _this.provinces = res.data.provinces;
      });
      this.showProSel = true;
    },
  },
  mounted() {
    this.province.id = this.$route.params.id;
    this.province.name = this.$route.params.name;
    this.province.tags = this.$route.params.tags;
    this.province.placecounts = this.$route.params.placecounts;
    if (this.province.name && this.province.tags) {
      this.btnVal = "修 改";
      this.title = "修改省份";
    }
    this.filterOptions(); //筛选下拉框的可选项目
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logoimg {
  width: 400px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.table_title {
  font-size: 27px;
  margin: 0px 0px 15px 0px;
  color: #74a8f5;
  font-weight: bold;
  letter-spacing: 5px;
}
.selectProvince {
  float: left;
}
.tagInput {
  margin-top: 68px;
  margin-right: 150px;
}

.footer {
  float: left;
  margin: 20px 0px 0px 5px;
}
</style>
