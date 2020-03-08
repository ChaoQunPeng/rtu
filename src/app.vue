<template>
  <div>
    <div class="container-layout">
      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home"></i>
      </router-link>
      <!-- <div class="left-layout">
        <img src="./assets/common/pcq.svg">
        <router-link to="/home" tag="div" class="left-layout-nav" replace>
          <i class="iconfont icon-home"></i>
        </router-link>
      </div>-->
      <div class="right-layout">
        <div class="header-layout">
          <i class="iconfont icon-angle-left" @click="$router.back()"></i>
          <i class="iconfont icon-angle-right" @click="$router.forward()"></i>
        </div>
        <div class="content-layout">
          <transition name="route" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "./home/home.vue";

export default {
  data() {
    return {
      msg: "first blood!"
    };
  },
  components: {
    Home
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
    }
  }
};
</script>

<style lang="less" scoped>
.container-layout {
  display: flex;
  height: 100%;
}

.left-layout {
  background: #fff;
  width: 80px;
}

.right-layout {
  flex: 1;
}

.header-layout {
  height: 80px;
  background: #f1f1f1;
}

.content-layout {
  padding: 30px 50px;
}

.left-layout-nav {
  text-align: center;
  margin-top: 20px;
  > i {
    display: block;
    font-size: 36px;
    cursor: pointer;
  }
}
</style>