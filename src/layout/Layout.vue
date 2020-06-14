
<template>
  <div class="container-layout">
    <div class="left-layout">
      <div class="app-ico">
        <!-- RTU -->
      </div>

      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home"></i>
      </router-link>

      <router-link to="/recycle" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-delete-fill"></i>
        <!-- <span class="count">{{recycleCount}}</span> -->
      </router-link>

      <div class="left-layout-nav bottom">
        <i class="iconfont icon-gallery-view" @click="gallery"></i>
      </div>
    </div>
    <div class="header-layout">
      <div class="header-layout-item header-layout-item-start">
        <nav-bar></nav-bar>
      </div>
      <div class="header-layout-item" style="flex:1;"></div>
      <div class="header-layout-item header-layout-item-end">
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
    return {
      recycleCount: 0
    };
  },
  components: {
    NavBar
  },
  created() {
    // document.body.style.backgroundColor =
    //   this.$route.name == "home" ? "#183055" : "#f8f8f8";
    // this.getDataList();
  },
  methods: {
    getDataList() {
      this.$axios.get(`experience/info`, { noLoading: false }).then(res => {
        this.recycleCount = res.data.data[0].recycleCount;
      });
    },
    gallery() {
      this.$modal();
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
@layout-theme: transparent;

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
        color: #fff;
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

  &-nav {
    position: relative;
    height: 70px;
    text-align: center;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    .iconfont {
      display: flex;
      font-size: 24px;
      text-shadow: 0 0 0 #fff;
      cursor: pointer;
      color: #fff;
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      transition: all 0.3s;
      text-shadow: 0 0 0 #fff;

      &:hover {
        border: 1px solid #fff;
        box-shadow: 0 0 12px #fff;
        width: 40px;
        height: 40px;
        text-shadow: 0 0 2px #fff;
      }
    }

    &.bottom {
      flex: 1;
      align-items: flex-end;
      padding-bottom: 15px;
    }

    .count {
      position: absolute;
      color: #fff;
      right: 24px;
      top: 18px;
      background: #f00;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .app-ico {
    color: #fff;
    text-align: center;
    font-size: 56px;
    font-weight: bold;
    font-family: monospace;
    padding: 10px 0;
    height: 80px;
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
}

.content-layout {
  margin-left: 80px;
  // padding: 20px 0 60px 20px;
  padding: 30px 0 60px 30px;
  background: @layout-theme;
  border-top-left-radius: 24px;
  // height: calc(100vh - 70px);
  height: 100vh;
}
</style>
  
