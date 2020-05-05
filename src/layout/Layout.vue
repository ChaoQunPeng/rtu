
<template>
  <div class="container-layout">
    <div class="left-layout">
      <div class="app-ico">RTU</div>

      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home"></i>
      </router-link>

      <div class="more-ellipsis">
        <i class="iconfont icon-gallery-view" style="font-size:24px;"></i>
      </div>
    </div>
    <div class="header-layout">
      <!-- Header
      <div class="nav-icon">
        <i class="iconfont icon-angle-left" @click="back()"></i>
        <i class="iconfont icon-angle-right" @click="forward()"></i>
      </div> -->
    </div>
    <div class="content-layout">
      <transition name="route" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // document.body.style.backgroundColor =
    //   this.$route.name == "home" ? "#183055" : "#f8f8f8";
  },
  methods: {
    forward() {
      this.$router.go(1);
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    // $route(to, from) {
    //   document.body.style.backgroundColor =
    //     to.name == "home" ? "#183055" : "#f8f8f8";
    // }
  }
};
</script>

<style lang="less" scoped>
.container-layout {
  height: 100%;
}

.header-layout {
  display: flex;
  align-items: center;
  margin-left: 120px;
  height: 60px;

  .nav-icon {
    cursor: pointer;
  }
}

.left-layout {
  width: 120px;
  position: fixed;
  height: 100%;
  color: #fff;
  background: #2f3542;

  .app-ico {
    color: #fff;
    text-align: center;
    font-size: 56px;
    font-weight: bold;
    font-family: monospace;
    margin-bottom: 30px;
    padding: 10px 0;
  }
}

.content-layout {
  margin-left: 90px;
  padding: 0 60px 60px 60px;
}

.left-layout-nav {
  margin-bottom: 25px;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    > i {
      text-shadow: 0 0 6px #fff;
    }
  }
  > i {
    display: block;
    font-size: 26px;
    text-shadow: 0 0 0 #fff;
    cursor: pointer;
    transition: all 0.3s;
  }
}

.more-ellipsis {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -24px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    text-shadow: 0 0 6px #fff;
  }
}
</style>
  
