<template>
  <div id="out">
    <div id="login">
      <div>
        <el-carousel
          height="500px"
          style="margin-top: 25px"
          :interval="1500"
          indicator-position="none"
        >
          <el-carousel-item v-for="item in imgPath" :key="item">
            <img class="img" :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="anmimate-box">
        <transition name="el-zoom-in-center">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      imgPath: [
        require("../assets/car1.png"),
        require("../assets/car2.png"),
        require("../assets/car3.png"),
        require("../assets/car4.png"),
      ],
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#out {
  height: 100vh;
  background-image: url(../assets/bgi.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
#login {
  width: 840px;
  height: 500px;
  background: white;
  border-radius: 20px;
  position: absolute;
  padding-right: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 5fr 3fr;
  box-shadow: 10px 10px 15px -10px;
}
img {
  width: 450px;
  height: 450px;
  border-radius: 15px;
}
.anmimate-box {
  height: 480px;
  
  overflow: hidden;
}
</style>
