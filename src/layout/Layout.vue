
<template>
  <div class="container-layout">
    <div class="left-layout">
      <div class="app-ico">
        <!-- RTU -->
      </div>

      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home-fill"></i>
      </router-link>

      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-delete-fill"></i>
      </router-link>

      <div class="left-layout-nav bottom">
        <i class="iconfont icon-gallery-view"></i>
      </div>
    </div>
    <div class="header-layout">
      <div class="header-layout-item header-layout-item-start">
        <nav-bar></nav-bar>
      </div>
      <div class="header-layout-item" style="flex:1;">
        <!-- <input type="text" /> -->
      </div>
      <div class="header-layout-item header-layout-item-end">
        <!-- <span>
          <i class="iconfont icon-user-fill"></i>
        </span> -->
        <span>
          <i class="iconfont icon-cog-fill"></i>
        </span>
      </div>
    </div>
    <div class="content-layout">
      <transition name="route" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavBar
  },
  created() {
    // document.body.style.backgroundColor =
    //   this.$route.name == "home" ? "#183055" : "#f8f8f8";
  },
  methods: {},
  watch: {
    // $route(to, from) {
    //   document.body.style.backgroundColor =
    //     to.name == "home" ? "#183055" : "#f8f8f8";
    // }
  }
};
</script>

<style lang="less" scoped>
@layout-theme: #fff;

body {
  background: @layout-theme;
}

.container-layout {
  height: 100%;
}

.header-layout {
  display: flex;
  align-items: center;
  margin-left: 80px;
  height: 70px;
  padding-left: 25px;
  background: @layout-theme;

  &-item {
    text-align: center;
  }

  &-item-start {
    text-align: center;
  }

  &-item-end {
    width: 120px;
    text-align: right;

    > span {
      margin-right: 10px;
      cursor: pointer;

      > .iconfont {
        font-size: 26px;
        color: var(--primary);
      }
    }
  }

  .nav-icon {
    cursor: pointer;
  }
}

.left-layout {
  width: 80px;
  position: fixed;
  left: 0;
  height: 100%;
  color: #fff;
  background: @layout-theme;
  display: flex;
  flex-direction: column;

  .app-ico {
    color: #fff;
    text-align: center;
    font-size: 56px;
    font-weight: bold;
    font-family: monospace;
    padding: 10px 0;
    height: 80px;
  }
}

.left-layout-nav {
  height: 70px;
  text-align: center;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    > i {
      text-shadow: 0 0 6px #fff;
    }
  }

  .iconfont {
    display: flex;
    font-size: 24px;
    text-shadow: 0 0 0 #fff;
    cursor: pointer;
    color: var(--primary);
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }

  &.bottom {
    flex: 1;
    align-items: flex-end;
    padding-bottom: 15px;
  }
}

.more-ellipsis {
  // position: absolute;
  // bottom: 20px;
  // left: 50%;
  // margin-left: -24px;
  // width: 42px;
  // height: 42px;
  // line-height: 42px;
  text-align: center;
  cursor: pointer;
  color: #57606f;
  transition: all 0.3s;
  &:hover {
    text-shadow: 0 0 6px #fff;
  }
}

.content-layout {
  margin-left: 80px;
  // padding: 20px 0 60px 20px;
  padding: 30px 0 60px 30px;
  background: #f1f2f6;
  border-top-left-radius: 24px;
  height: calc(100vh - 70px);
}
</style>
  
