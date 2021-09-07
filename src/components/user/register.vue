<template>
  <div>
    <div id="firstLine">
      <span>
        <h3>欢&nbsp;迎&nbsp;注&nbsp;册</h3>
      </span>
      <div class="tips_login">
        <p>
          已有账号？<span type="primary" id="login" @click="goToLogin"
            >登录</span
          >
        </p>
        <!-- <span class="login_span">已有账号? </span> -->
      </div>
    </div>

    <div id="next">
      <div class="input">
        <div id="icon1">
          <i class="el-icon-phone-outline"></i>
          <input
            type="text"
            @focus="iconbig1"
            @blur="iconsmall1"
            v-model="user.username"
            placeholder="请输入电话号码"
          />
          <el-tooltip
            class="item"
            v-show="acc.tipsSwitch_err"
            effect="dark"
            :content="acc.tips"
            placement="top-end"
          >
            <i style="color: #f56c6c" class="el-icon-error"></i>
          </el-tooltip>
          <i
            v-show="acc.tipsSwitch_succ"
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
            type="password"
            @focus="iconbig2"
            @blur="iconsmall2"
            v-model="user.password"
            placeholder="请输入密码"
          />
          <el-tooltip
            class="item"
            v-show="pwd.tipsSwitch_err"
            effect="dark"
            :content="pwd.tips"
            placement="top-end"
          >
            <i style="color: #f56c6c" class="el-icon-error"></i>
          </el-tooltip>
          <i
            v-show="pwd.tipsSwitch_succ"
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
        <div id="icon3">
          <i class="el-icon-s-promotion"></i>

          <input
            type="text"
            @focus="iconbig3"
            @blur="iconsmall3"
            v-model="user.email"
            placeholder="请输入邮箱"
          />
          <el-tooltip
            class="item"
            v-show="email.tipsSwitch_err"
            effect="dark"
            :content="email.tips"
            placement="top-end"
          >
            <i style="color: #f56c6c" class="el-icon-error"></i>
          </el-tooltip>
          <i
            v-show="email.tipsSwitch_succ"
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

      <div id="code">
        <div id="icon4">
          <i class="el-icon-picture-outline"></i>

          <input
            id="input_code"
            type="text"
            @focus="iconbig4"
            @blur="iconsmall4"
            v-model="code"
            placeholder="验证码"
          />
          <el-tooltip
            class="item"
            v-show="codeTip.tipsSwitch_err"
            effect="dark"
            :content="codeTip.tips"
            placement="top-end"
          >
            <i style="color: #f56c6c" class="el-icon-error"></i>
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
        <div class="imgCode">
          <img :src="src" id="img-vcode" @click="getImage" :key="key" />
        </div>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" id="button" @click="userRegister"
        >注&nbsp;册</el-button
      >
    </div>
    <div id="tips">问题致电: <span> 18888888888 </span>（彭经理）</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      acc: {
        tipsSwitch_err: false,
        tipsSwitch_succ: false,
        tips: "",
      },
      pwd: {
        tipsSwitch_err: false,
        tipsSwitch_succ: false,
        tips: "",
      },
      email: {
        tipsSwitch_err: false,
        tipsSwitch_succ: false,
        tips: "",
      },
      codeTip: {
        tipsSwitch_err: false,
        tips: "",
      },
      src: "",
      key: "",
      code: "",
      user: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    iconbig1() {
      document.getElementById("icon1").classList.add("iconbig");
    },
    iconsmall1() {
      var phone = this.user.username;
      if (phone == "") {
        this.acc.tipsSwitch_succ = false;
        this.acc.tipsSwitch_err = true;
        this.acc.tips = "手机号不能为空!";
        document.getElementById("icon1").classList.remove("iconbig");
        return;
      }
      //手机号码正则
      var regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(phone)) {
        //合法的手机号码
        this.acc.tipsSwitch_err = false;
        this.acc.tipsSwitch_succ = true;
      } else {
        this.acc.tipsSwitch_err = true;
        this.acc.tipsSwitch_succ = false;
        this.acc.tips = "手机号格式不正确!";
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
        this.pwd.tipsSwitch_succ = false;
        this.pwd.tipsSwitch_err = true;
        this.pwd.tips = "密码长度不得为空!";
      } else if (pwd.length < 8) {
        //密码长度小于8位数
        this.pwd.tipsSwitch_succ = false;
        this.pwd.tipsSwitch_err = true;
        this.pwd.tips = "密码长度不得小于8位数!";
      } else {
        this.pwd.tipsSwitch_err = false;
        this.pwd.tipsSwitch_succ = true;
      }
      document.getElementById("icon2").classList.remove("iconbig");
    },
    iconbig3() {
      document.getElementById("icon3").classList.add("iconbig");
    },
    iconsmall3() {
      var em = this.user.email;
      if (em == "") {
        this.email.tipsSwitch_succ = false;
        this.email.tipsSwitch_err = true;
        this.email.tips = "邮箱不能为空!";
        document.getElementById("icon3").classList.remove("iconbig");
        return;
      }
      //邮箱正则表达式
      var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(em)) {
        //合法的邮箱
        this.email.tipsSwitch_err = false;
        this.email.tipsSwitch_succ = true;
      } else {
        this.email.tipsSwitch_err = true;
        this.email.tipsSwitch_succ = false;
        this.email.tips = "邮箱格式不正确!";
      }
      document.getElementById("icon3").classList.remove("iconbig");
    },
    iconbig4() {
      document.getElementById("icon4").classList.add("iconbig");
    },
    iconsmall4() {
      var codetemp = this.code;
      if (codetemp == "") {
        this.codeTip.tipsSwitch_err = true;
        this.codeTip.tips = "验证码不能为空!";
      } else if (codetemp.length != 4) {
        this.codeTip.tipsSwitch_err = true;
        this.codeTip.tips = "验证码长度不正确!";
      } else {
        this.codeTip.tipsSwitch_err = false;
      }
      document.getElementById("icon4").classList.remove("iconbig");
    },

    getImage() {
      //获取验证码
      let _this = this;
      this.$axios.get("/user/getImage").then((res) => {
        //console.log(res.data.key);
        //base64编码的png图片解析
        _this.src = "data:image/png;base64," + res.data.image;
        _this.key = res.data.key;
      });
    },

    userRegister() {
      if (
        this.acc.tipsSwitch_succ &&
        this.pwd.tipsSwitch_succ &&
        this.email.tipsSwitch_succ &&
        this.code.length == 4
      ) {
        this.$axios
          .post(
            "/user/register?code=" + this.code + "&key=" + this.key,
            this.user
          )
          .then((res) => {
            //console.log(res);
            if (res.status == 200 && res.data.state) {
              this.$message({
                message: "注册成功！欢迎您的加入！",
                type: "success",
              });
              this.$router.push("/input/login");
              return;
            } else if (res.status == 200 && !res.data.state) {
              this.$message({
                message: "注册失败！验证码错误",
                type: "error",
              });
            } else {
              if (res.status != 200) {
                this.$message({
                  message: "Sorry！服务器错误！",
                  type: "error",
                });
                return;
              }
            }
          });
      } else {
        if (this.user.username == "") {
          this.acc.tipsSwitch_err = true;
          this.acc.tips = "手机号不能为空！";
        }
        if (this.user.password == "") {
          this.pwd.tipsSwitch_err = true;
          this.pwd.tips = "密码不能为空！";
        }
        if (this.user.email == "") {
          this.email.tipsSwitch_err = true;
          this.email.tips = "邮箱不能为空！";
        }
        if (this.code == "") {
          this.codeTip.tipsSwitch_err = true;
          this.codeTip.tips = "验证码不能为空！";
        }
        this.$message({
          message: "注册失败！请检查注册信息是否正确！",
          type: "error",
        });
      }
    },
    goToLogin() {
      this.$router.push("/input/login");
    },
  },
  created() {
    //生命周期开启就调用
    this.getImage(); //获取验证码
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firstLine {
  position: relative;
}
h3 {
  margin: 25px 0px 0px 0px;
  color: #191c20;
  font-size: 28px;
}
.tips_login {
  margin: 0px 0px 20px 0px;
  font-size: 14px;
}
.tips_login p {
  margin-top: 5px;
}
#login {
  color: #2e58ff;
  cursor: pointer;
}
#next {
  display: grid;
  height: 294px;
  grid-template-rows: repeat(4, 1fr);
}
h4 {
  margin-left: 20px;
}

#wangji {
  text-decoration: none;
}
#tips {
  font-size: 10px;
}
#tips span {
  font-weight: bold;
}
#code {
  margin-left: 15px;
  margin-right: 121px;
  margin-top: 20px;
}
#input_code {
  width: 93px;
}
.imgCode {
  width: 100px;
  position: relative;
  top: -42px;
  left: 190px;
}
.imgCode img {
  width: 90px;
  height: 35px;
}
.input {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
}
input {
  border: none;
  font-size: 18px;
  width: 200px;
}
input:focus {
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
  margin-bottom: 10px;
}
#icon1,
#icon2,
#icon3,
#icon4 {
  transition: 1s;
  margin-top: -15px;
}
.clearfix:after {
  content: "."; /**/ /*内容为“.”就是一个英文的句号而已。也可以不写。*/
  display: block; /**/ /*加入的这个元素转换为块级元素。*/
  clear: both; /**/ /*清除左右两边浮动。*/
  visibility: hidden; /**/ /*可见度设为隐藏。注意它和display:none;是有区别的。visibility:hidden;仍然占据空间，只是看不到而已；*/
  line-height: 0; /**/ /*行高为0；*/
  height: 0; /**/ /*高度为0；*/
  font-size: 0; /**/ /*字体大小为0；*/
}

.clearfix {
  *zoom: 1;
} /**/ /*这是针对于IE6的，因为IE6不支持:after伪类，这个神奇的zoom:1让IE6的元素可以清除浮动来包裹内部元素。*/
</style>
