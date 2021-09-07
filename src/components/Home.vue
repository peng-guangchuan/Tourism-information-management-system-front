
<template>
  <div
    id="out"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <center>
      <div id="out2">
        <el-container>
          <el-header>
            <div class="pageHeader">
              <el-page-header title="主页" @back="goBack" :content="header_tips" >
              </el-page-header>
            </div>
            <div class="date">
              <p>
                {{ datetime }} &nbsp;&nbsp;
                <span class="exit" @click="exitHome"
                  >安全退出 <i style="color: #2f4f4f" class="el-icon-close"></i>
                </span>
              </p>
            </div>
          </el-header>
          <div id="header-bar"></div>
          <el-main>
            <!-- <transition name="el-fade-in-linear"> -->
              <router-view />
            <!-- </transition> -->
          </el-main>
          <div id="header-bar"></div>
          <el-footer>
            <div>
              <el-row :gutter="20">
                <el-col :span="4"><div>&nbsp;</div></el-col>
                <el-col :span="16"
                  ><div style="font-size: 13px">PGC2018@Travel</div></el-col
                >
                <el-col :span="4"><div>&nbsp;</div></el-col>
              </el-row>
            </div>
          </el-footer>
        </el-container>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      timer: "",
      datetime: "",
      loading: false,
      header_tips: "旅游信息管理系统",
    };
  },

  methods: {
    goBack() {
      if (this.$route.path == "/home/provincelist") {
        this.$message({
          message: "这已经是主页啦！",
          type: "warning",
        });
      }else{
        // this.$router.go(-1);
        this.$router.push("/home/provincelist");
      }
    },
    exitHome() {
      this.$router.push("/input/login");
    },
  },
  created() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1500);
  },
  mounted() {
    /* 每秒定时刷新 */
    this.timer = setInterval(() => {
      this.datetime = this.dayjs().format("YYYY/MM/DD HH:mm:ss");
      //console.log(this.datetime);
    }, 1000);
  },
  beforeDestroy() {
    /* 离开页面前销毁定时器 */
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#out {
  height: 100vh;
  background-image: url(../assets/homebgi1.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
#out2 {
  position: relative;
  width: 1160px;
  top: 50px;
  box-shadow: 5px 5px 6px 6px#E6E6FA, -2px -2px 6px 6px #f8f8ff;
}
.el-header {
  padding: 2px 16px;
  background: #85c329;
  background: linear-gradient(0.1turn, #00bfff, #4682b4, #87cefa);
  color: #fff;
  font-size: 12px;
}
.pageHeader {
  width: 500px;
  position: relative;
  top: 50%;
  right: 27%;
  transform: translateY(-50%);
}
.date {
  width: 300px;
  position: relative;
  top: -30%;
  left: 37%;
  font-size: 20px;
  transform: translateY(-50%);
}
.exit {
  font-size: 16px;
  color: #9370db;
  cursor: pointer;
}
.exit:hover {
  text-decoration: underline;
  color: #7b68ee;
}
.el-footer {
  background: #85c329;
  background: linear-gradient(0.1turn, #00bfff, #4682b4, #87cefa);
  padding: 15px 15px 25px 15px;
  color: #fff;
  font-size: 12px;
}
.el-main {
  background-color: #f5fffa;
  text-align: center;
}
#header-bar {
  background: linear-gradient(0.5turn, #b0c4de, #f8f8ff);
  border-top: 1px solid #ffffff;
  height: 25px;
  position: relative;
}
</style>