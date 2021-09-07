<template>
  <div>
    <div id="firstLine">
      <span>
        <img src="../../assets/Logo.jpg" id="img" alt />
      </span>
      <span>
        <h3>旅游信息管理系统</h3>
      </span>
    </div>

    <div id="next">
      <div>
        <!-- <h2>登陆</h2> -->
      </div>

      <div class="input">
        <div id="icon1">
          <i class="el-icon-user"></i>

          <input
            type="text"
            @focus="iconbig1"
            @blur="iconsmall1"
            v-model="user.username"
            placeholder="请输入账号"
          />
          <el-tooltip
            class="item"
            v-show="acc_tipsSwitch"
            effect="dark"
            :content="acc_tips"
            placement="top-end"
          >
            <i style="color: #f56c6c" class="el-icon-error"></i>
          </el-tooltip>
          <i
            v-show="acc_tipsSwitch_succ"
            class="el-icon-success"
            style="color: #67c23a"
          ></i>
        </div>

        <hr
          style="
            height: 1px;
            border: none;
            border-top: 0.5px solid;
            margin-top: 5px;
          "
        />
      </div>

      <div class="input">
        <div id="icon2">
          <i class="el-icon-lock"></i>

          <input
            :type="showpsd"
            style="width:180px;"
            @focus="iconbig2"
            @blur="iconsmall2"
            v-model="user.password"
            placeholder="请输入密码"
          />
          <i @click="Switchpsd" style="cursor: pointer;" class="el-icon-view"></i>
          <el-tooltip
            class="item"
            v-show="pwd_tipsSwitch"
            effect="dark"
            :content="pwd_tips"
            placement="top-end"
          >
            <i style="color: #f56c6c;" class="el-icon-error"></i>
          </el-tooltip>
        </div>
        <hr
          style="
            height: 1px;
            border: none;
            border-top: 0.5px solid;
            margin-top: 5px;
          "
        />
      </div>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        id="button"
        @click="loginPage"
        @keyup.enter.native="loginPage"
        >登&nbsp;录</el-button
      >
    </div>
    <el-link type="primary" id="register" @click="goToRegister"
      >注册账号</el-link
    >
    <div id="tips">问题致电: <span> 18888888888 </span>（彭经理）</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      acc_tipsSwitch: false,
      acc_tipsSwitch_succ: false,
      acc_tips: "",
      pwd_tipsSwitch: false,
      pwd_tips: "",
      showpsd:"password",//默认不显示出明文密码
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    iconbig1() {
      document.getElementById("icon1").classList.add("iconbig");
    },
    iconsmall1() {
      var acc = this.user.username;
      if (acc == "") {
        this.acc_tipsSwitch_succ = false;
        this.acc_tipsSwitch = true;
        this.acc_tips = "账号不能为空!";
        document.getElementById("icon1").classList.remove("iconbig");
        return;
      }
      //手机号码正则
      var regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(acc)) {
        //合法的手机号码
        this.acc_tipsSwitch = false;
        this.acc_tipsSwitch_succ = true;
      } else {
        this.acc_tipsSwitch = true;
        this.acc_tipsSwitch_succ = false;
        this.acc_tips = "账号格式不正确!";
      }
      document.getElementById("icon1").classList.remove("iconbig");
    },
    iconbig2() {
      document.getElementById("icon2").classList.add("iconbig");
    },
    iconsmall2() {
      var pwd = this.user.password;
      if (pwd == "") {
        //密码为空
        this.pwd_tipsSwitch = true;
        this.pwd_tips = "密码长度不得为空!";
      } else if (pwd.length < 8) {
        //密码长度小于8位数
        this.pwd_tipsSwitch = true;
        this.pwd_tips = "密码长度不得小于8位数!";
      } else {
        this.pwd_tipsSwitch = false;
      }
      document.getElementById("icon2").classList.remove("iconbig");
    },
    Switchpsd(){
      if(this.showpsd == "password"){
        this.showpsd = "text";
      }else{
        this.showpsd = "password";
      }
    },
    loginPage() {
      var accSit = this.acc_tipsSwitch_succ; //获取账号格式状态
      var pwd = this.pwd_tipsSwitch; //获取密码格式状态
      if (accSit && !pwd) {
        //格式正确，访问接口确认账号密码
        this.$axios.post("/user/login", this.user).then((res) => {
          //console.log(res);
          
          // 本地保存用户id https://www.jb51.net/article/119995.htm
          // 用以防止跳过登陆界面路由 https://blog.csdn.net/weixin_30855099/article/details/101763020?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control
          localStorage.setItem("userid", res.data.userId); 
          if (res.status == 200 && res.data.state) {
            this.$message({
              message:
                "登陆成功！尊敬的" + this.user.username + "用户，欢迎您！",
              type: "success",
            });
            this.$router.push("/home");
            return;
          } else {
            if (res.status != 200) {
              this.$message({
                message: "Sorry！服务器错误！",
                type: "error",
              });
              return;
            } else {
              this.$message({
                message: "登陆失败！请检查账号和密码是否正确！",
                type: "error",
              });
            }
          }
        });
      } else {
        var acc = this.user.username;
        var pwd = this.user.password;
        if (acc == "") {
          this.acc_tipsSwitch = true;
          this.acc_tips = "账号不能为空!";
        }
        if (pwd == "") {
          this.pwd_tipsSwitch = true;
          this.pwd_tips = "密码长度不得为空!";
        }
        this.$message({
          message: "登陆失败！请检查账号和密码是否正确！",
          type: "error",
        });
      }
    },
    goToRegister() {
      this.$router.push("/input/register");
    },
  },
  created() {
    let that = this;
    document.onkeydown = function (e) {
      e = window.event || e;
      // 验证在登录界面和按得键是回车键enter
      if (
        that.$route.path === "/input/login" &&
        (e.code === "Enter" || e.code === "enter")
      ) {
        // 登录事件
        that.loginPage();
      }
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#img {
  width: 100px;
  height: 71px;
  margin-top: 25px;
  border-radius: 20px;
}

#firstLine {
  height: 130px;
  position: relative;
}
h3 {
  margin: 25px 0px 70px 0px;
  color: #409eff;
}
#next {
  display: grid;
  height: 222px;
  grid-template-rows: repeat(3, 1fr);
}
h4 {
  margin-left: 20px;
}

#wangji {
  text-decoration: none;
}
#register {
  font-size: 16px;
  margin: 10px 0px 15px 0px;
}
#tips {
  font-size: 10px;
}
#tips span {
  font-weight: bold;
}
.input {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
}
input {
  border: none;
  font-size: 18px;
  width: 200px;
}
input:focus {
  outline: none;
}

.el-input{
  border: none;
  font-size: 18px;
  width: 200px;
  padding: 0px 0px 0px 0px;
}
.el-input:focus{
  outline: none;
}
/* #icon:hover {
  transform: scale(1.2);
  transition: 1s;
} */
.iconbig {
  transform: scale(1.2);
}
#button {
  width: 200px;
  font-size: 20px;
}
#icon1,
#icon2 {
  transition: 1s;
  margin-top: -15px;
}
</style>
