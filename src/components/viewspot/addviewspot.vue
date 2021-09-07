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
          <el-row>
            <el-col class="elcol1" :span="6">
              <div>景点名称：</div>
              <div style="margin-bottom: 122px">印象图片：</div>
              <div style="margin-bottom: 67px; padding-top: 5px">
                景点描述：
              </div>
              <div style="margin-bottom: 35px">旺季时间：</div>
              <div style="margin-bottom: 35px">旺季门票：</div>
              <div style="margin-bottom: 30px">淡季门票：</div>
              <div style="margin-bottom: 35px">所属省份：</div>
            </el-col>
            <el-col :span="12" class="elcol2">
              <div>
                <el-input
                  style="margin-top: -10px; width: 207px"
                  v-model="place.name"
                  @blur="checkName"
                  placeholder="请输入景点的名称"
                ></el-input>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="请输入景点名"
                  placement="right"
                >
                  <i
                    ref="nameTips"
                    style="color: #f56c6c; visibility: hidden"
                    class="el-icon-error"
                  ></i>
                </el-tooltip>
                <div class="imgdiv">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="图片格式为jpg,jpeg,png。大小不超过2M，推荐长宽比1:1"
                    placement="right"
                  >
                    <!-- on-change绑定一个方法来接收图片信息，auto-upload设置成false为不立即上传图片 -->
                    <el-upload
                      ref="uploadimg"
                      class="avatar-uploader"
                      action=""
                      :on-change="imgBroadcastChange"
                      accept="image/jpg,image/png,image/jpeg"
                      :show-file-list="false"
                      :auto-upload="false"
                    >
                      <img
                        v-if="place.picpath"
                        :src="place.picpath"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-tooltip>
                </div>
                <el-input
                  ref="text"
                  id="inp"
                  style="width: 300px"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  placeholder="请输入该景点的描述(必须)"
                  v-model="place.placedes"
                  maxlength="200"
                  show-word-limit
                >
                </el-input>
              </div>
              <div>
                <el-input
                  style="margin-top: 3px; width: 207px"
                  v-model="place.hottime"
                  @blur="checkHottime"
                  placeholder="输入格式为2020/01/01"
                ></el-input>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="日期格式为2020/01/01"
                  placement="right"
                >
                  <i
                    ref="datetips"
                    style="color: #f56c6c; visibility: hidden"
                    class="el-icon-error"
                  ></i>
                </el-tooltip>
              </div>
              <div>
                <el-input
                  style="margin-top: 3px; width: 207px"
                  v-model="place.hotticket"
                  @blur="checkHotticket"
                  placeholder="纯数字格式，最多两位小数"
                ></el-input>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="输入纯数字格式，最多两位小数"
                  placement="right"
                >
                  <i
                    ref="hotticketTips"
                    style="color: #f56c6c; visibility: hidden"
                    class="el-icon-error"
                  ></i>
                </el-tooltip>
              </div>
              <div>
                <el-input
                  style="margin-top: 3px; width: 207px"
                  v-model="place.dimticket"
                  @blur="checkDimticket"
                  placeholder="纯数字格式，最多两位小数"
                ></el-input>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="输入纯数字格式，最多两位小数"
                  placement="right"
                >
                  <i
                    ref="dimticketTips"
                    style="color: #f56c6c; visibility: hidden"
                    class="el-icon-error"
                  ></i>
                </el-tooltip>
              </div>
              <div>
                <el-input
                  style="margin-top: 3px; width: 207px"
                  v-model="province.name"
                  :disabled="true"
                  placeholder="该景点所属省份"
                ></el-input>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="请重新进入此页面！"
                  placement="right"
                >
                  <i
                    ref="checkProvinceName"
                    style="color: #f56c6c; visibility: hidden"
                    class="el-icon-error"
                  ></i>
                </el-tooltip>
              </div>
              <div class="footer">
                <el-button
                  type="success"
                  @click="addView"
                  v-text="btnVal"
                ></el-button>
                &nbsp;&nbsp;<el-link
                  type="primary"
                  target="_blank"
                  @click="goback"
                  >返回</el-link
                >
              </div></el-col
            >
          </el-row>
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
  name: "viewspotlist",
  data() {
    return {
      province: [],
      place: {
        dimticket: "",
        hotticket: "",
        hottime: "",
        id: "",
        name: "",
        picpath: "",
        placedes: "",
      },
      viewid: "",
      provinceid: "",
      btnVal: "添 加",
      title: "添加景点",
      //imageUrl: "",
      fileimg: "",
      nameTips: false, //景点名是否为空
      datetips: false, //日期格式
      hotticketTips: false, //旺季门票格式
      dimticketTips: false, //淡季门票格式
    };
  },
  methods: {
    goback() {
      this.$router.push("/home/viewspotlist");
    },
    checkName() {
      var viewName = this.place.name;
      if (viewName == "") {
        this.nameTips = false;
        this.$refs.nameTips.style.visibility = "visible";
      } else {
        this.nameTips = true;
        this.$refs.nameTips.style.visibility = "hidden";
      }
    },
    checkHottime() {
      var hotTime = this.place.hottime;
      if (hotTime != "") {
        //2020/12/12 格式正则
        var regDate = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
        if (regDate.test(hotTime)) {
          //合格日期格式
          this.datetips = true;
          this.$refs.datetips.style.visibility = "hidden";
        } else {
          this.datetips = false;
          this.$refs.datetips.style.visibility = "visible";
        }
      } else {
        this.datetips = false;
        this.$refs.datetips.style.visibility = "visible";
      }
    },
    checkHotticket() {
      var hotTick = this.place.hotticket;
      if (hotTick != "") {
        //门票价格 小数点两位 格式正则
        var regPrice = /^(\d+)(.\d{0,2})?$/;
        if (regPrice.test(hotTick)) {
          //合格价格格式
          this.hotticketTips = true;
          this.$refs.hotticketTips.style.visibility = "hidden";
        } else {
          this.hotticketTips = false;
          this.$refs.hotticketTips.style.visibility = "visible";
        }
      } else {
        this.hotticketTips = false;
        this.$refs.hotticketTips.style.visibility = "visible";
      }
    },
    checkDimticket() {
      var dimTick = this.place.dimticket;
      if (dimTick != "") {
        //门票价格 小数点两位 格式正则
        var regPrice = /^(\d+)(.\d{0,2})?$/;
        if (regPrice.test(dimTick)) {
          //合格价格格式
          this.dimticketTips = true;
          this.$refs.dimticketTips.style.visibility = "hidden";
        } else {
          this.dimticketTips = false;
          this.$refs.dimticketTips.style.visibility = "visible";
        }
      } else {
        this.dimticketTips = false;
        this.$refs.dimticketTips.style.visibility = "visible";
      }
    },
    checkProvinceName() {
      if (this.province.name == undefined) {
        this.$refs.checkProvinceName.style.visibility = "visible";
      } else {
        this.$refs.checkProvinceName.style.visibility = "hidden";
      }
    },
    imgBroadcastChange(file, fileList) {
      //console.log("file.raw=" + file.raw);
      this.fileimg = file.raw;//保存全局对象，用以上传方法使用
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((data) => {
          //console.log("data:"+data);
          this.place.picpath = data.result; //base64回显
          //console.log("data.result:"+data.result);
        });
      } else {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
    },
    uploadImgToBase64(file) {
      //核心方法，将图片转成base64字符串形式
      return new Promise((resolve, reject) => {
        //console.log("resolve:"+resolve+",reject:"+reject);
        const reader = new FileReader();
        reader.readAsDataURL(file); //转base64方法
        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader);
        };
        reader.onerror = reject;
        //console.log("resolve:"+resolve+",reject:"+reject);
      });
    },
    addView() {
      this.checkName(); //检查景点名
      this.checkHottime(); //检查旺季时间格式
      this.checkHotticket(); //检查旺季门票格式
      this.checkDimticket(); //检查淡季门票格式
      this.checkProvinceName(); //检查无法编辑的省份名
      if (this.place.picpath == "") {
        this.$message.error("请添加景点图片!");
        return;
      } else if (
        !this.nameTips ||
        this.place.placedes == "" ||
        !this.datetips ||
        !this.hotticketTips ||
        !this.dimticketTips ||
        this.province.name == undefined
      ) {
        this.$message.error("请完善景点信息！");
        // console.log("nameTips="+this.nameTips+",palcedes="+this.place.placedes
        // +",datetips="+this.datetips+",hotticketTips="+this.hotticketTips
        // +",dimticketTips="+this.dimticketTips+",province.name="+this.province.name)
        return;
      }
      // console.log("((imgUrl))"+this.fileimg);
      // console.log("this.place"+this.place);
      // console.log("this.provinceid"+this.provinceid);
      let formData = new FormData();
      formData.append("pic", this.fileimg);
      formData.append("name", this.place.name);
      formData.append("hottime", this.place.hottime);
      formData.append("hotticket", this.place.hotticket);
      formData.append("dimticket", this.place.dimticket);
      formData.append("placedes", this.place.placedes);
      formData.append("provinceid", this.provinceid);
      if (this.title == "添加景点") {
        //axios
        this.$axios({
          method: "post",
          url: "/place/save",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          // console.log(res);
          if (res.data.state) {
            this.$message({
              message: "新景点添加成功！",
              type: "success",
            });
            this.goback();
          } else {
            this.$message.error("新景点添加失败！服务器或网络错误！");
          }
        });
      } else {
        // 修改景点信息
        formData.append("id", this.viewid);
        this.$axios({
          method: "post",
          url: "/place/update",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          console.log(res.data);
          if (res.data.state) {
            this.$message({
              message: "景点修改成功！",
              type: "success",
            });
            this.goback();
          } else {
            this.$message.error("景点修改失败！服务器或网络错误！");
          }
        });
      }
    },
    findOnePlace() {
      //根据id查询景点信息
      var _this = this;
      this.$axios.get("/place/findOne?id=" + this.viewid).then((res) => {
        // console.log(res);
        _this.place = res.data;
        //_this.imageUrl = _this.place.picpath;
        // console.log(this.place);
        _this.provinceid = res.data.provinceid;
        this.findOneProvince();
        //_this.src = "data:image/png;base64,"+_this.place.picpath;
        //_this.imgsrc = _this.place.picpath;
      });
    },
    findOneProvince() {
      var _this = this;
      this.$axios.get("/province/findOne?id=" + this.provinceid).then((res) => {
        //console.log(res);
        _this.province = res.data;
      });
    },
  },
  mounted() {
    this.provinceid = this.$route.params.provid;
    this.viewid = this.$route.params.viewid;
    // console.log("this.$route.params.provid="+this.$route.params.provid);
    // console.log("this.$route.params.viewid="+this.$route.params.viewid);
    if (this.$route.params.viewid) {
      this.btnVal = "修 改";
      this.title = "修改景点";
      this.findOnePlace();
    } else {
      this.findOneProvince();
    }
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
.elcol1 div {
  margin: 5px 0px 25px 0px;
  color: #696969;
  font-weight: bold;
  letter-spacing: 3px;
}
.elcol2 div {
  margin-top: 10px;
}
#upload-tip {
  border: 1px dashed #d9d9d9;
  width: 135px;
  height: 135px;
  line-height: 135px;
  cursor: pointer;
  font-size: 6px;
  color: #d9d9d9;
}
#img-show {
  width: 135px;
  height: 135px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
}
#imgfile {
  width: 64%;
  background: #eee;
  background: #fff;
}
.footer {
  float: left;
  margin: 20px 0px 0px 5px;
}
.imgdiv {
  width: 140px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 135px;
  height: 135px;
  line-height: 135px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 10px;
}
.avatar {
  width: 135px;
  height: 135px;
  display: block;
  object-fit: contain;
  /* （保持纵横比缩放图片，使图片的长边能完全显示出来） */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
