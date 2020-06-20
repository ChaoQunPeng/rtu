
<template>
  <div class="container-layout">
    <div class="left-layout">
      <div class="app-ico">
        <!-- RTU -->
      </div>

      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home-fill"></i>
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
          <i class="iconfont icon-theme">
            <input ref="themePick" type="color" />
          </i>
        </span>

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
  mounted() {
    const themePick = this.$refs.themePick;
    // 好像不能用input
    themePick.addEventListener("input", event => {
      document.documentElement.style.setProperty(
        "--primary",
        event.target.value
      );
    });
  },
  methods: {
    getDataList() {
      this.$axios.get(`experience/info`, { noLoading: false }).then(res => {
        this.recycleCount = res.data.data[0].recycleCount;
      });
    },
    gallery() {
      let vm = this;
      this.$modal({
        title: `说明`,
        body: function() {
          return (
            <div>
              <h2 class="text-center">说明</h2>
              <p>
                我们会喜欢玩游戏其中一个原因就是反馈快。当我们击杀怪物后，马上就能获得装备，经验或者是升级，非常直观。
                而学习的话需要一个长时间的积累才能看到成果，而且每次学习完之后我们不能感觉到像玩游戏一样“打了怪，赚了经验,升级了级”。
                也无法直观的对自己的能力有一个“认识”。不知道自己属于哪一个“级别”。
              </p>
              <p>
                所以RTU(Road To upgrade)
                升级之路就是想做这件事。希望尽可能的把所学的知识经验具现化。理论上借鉴了
                <a target="_blank" href="https://www.zybuluo.com/flysmart/note/213521">
                  德雷福斯模型
                </a>
                和
                <a target="_blank" href="https://zh.wikipedia.org/zh-hans/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF">
                  艾宾浩斯记忆曲线（这个还未加入到项目中）
                </a>
                设计了一个简单易用的等级系统。
              </p>
              <p>
                <h4>等级划分</h4>

                <p> 新手（novice）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为1000exp，每个等级200点经验
                </p>
                <p> 高级新手（advanced beginner）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为2000exp，每个等级400点经验
                </p>
                <p> 胜任者（competent）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为3000exp，每个等级600点经验
                </p>
                <p> 精通者（proficient）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为4000exp，每个等级800点经验
                </p>
                <p> 专家（expert）</p>
                <p>
                  无等级，此App的尽头，专家后应该不需要用这个了~ ヽ(ー_ー)ノ
                </p>
                <p>
                  每1点经验对应为1个小时，所以10000点经验正好就是10000个小时。这正是成为一个专家级人物需要的至少时间。
                  <u>**而且是有效时间**</u>。当然，天赋极佳者会更短。
                </p>
              </p>
            </div>
          );
        },
        footer: function() {
          function close(event) {
            // 总感觉不是长久之计
            const modal = event.path[event.path.length - 5];
            modal.remove();
          }

          return (
            <button v-pcq-button id="b1" onClick={close}>
              关闭
            </button>
          );
        }
      });
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

    .icon-theme {
      position: relative;

      > input[type="color"] {
        position: absolute;
        top: -8px;
        left: -5px;
        opacity: 0;
        cursor: pointer;
        height: 41px;
        width: 35px;
      }
    }
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
      color: var(--primary);
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      transition: all 0.3s;
      text-shadow: 0 0 0 #fff;

      &:hover {
        border: 1px solid var(--primary);
        box-shadow: 0 0 5px var(--primary);
        width: 40px;
        height: 40px;
        text-shadow: 0 0 2px var(--primary);
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
  padding: 30px 0 60px 30px;
  background: var(--gray);
  border-top-left-radius: 24px;
  min-height: calc(100vh - 70px);
}
</style>
  
