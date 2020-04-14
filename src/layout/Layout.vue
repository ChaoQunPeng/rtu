<template>
  <div class="container-layout">
    <div class="left-layout">
      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home"></i>
      </router-link>

      <div class="more-ellipsis">
        <i class="iconfont icon-gallery-view" style="font-size:24px;"></i>
      </div>
    </div>
    <div class="right-layout">
      <div class="header-layout">
        <div class="nav-icon">
          <i class="iconfont icon-angle-left" @click="back()"></i>
          <i class="iconfont icon-angle-right" @click="forward()"></i>
        </div>
      </div>
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
    document.body.style.backgroundColor =
      this.$route.name == "home" ? "#183055" : "#f8f8f8";
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
    $route(to, from) {
      document.body.style.backgroundColor =
        to.name == "home" ? "#183055" : "#f8f8f8";
    }
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
  margin-bottom: 30px;
  padding-top: 30px;

  .nav-icon {
    cursor: pointer;
  }
}

.left-layout {
  width: 80px;
  position: fixed;
  height: 100%;
  color: #fff;
  background: #0b192e;
}

.right-layout {
  margin-left: 80px;
  padding: 0 60px 60px 60px;
}

.content-layout {
  padding: 30px 50px;
}

.left-layout-nav {
  text-align: center;
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.1);
  width: 42px;
  height: 42px;
  line-height: 42px;
  border-radius: 50%;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  > i {
    display: block;
    font-size: 24px;
    cursor: pointer;
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
  
