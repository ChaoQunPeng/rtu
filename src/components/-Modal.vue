<template>
  <div ref="modals" class="modal" v-if="visible">
    <!-- {'modal-shade-active':visible} -->
    <div
      class="modal-shade"
      :class="[visible?'modal-shade-fadeIn':'modal-shade-fadeOut']"
      @click="close()"
    ></div>
    <div class="modal-content" :class="[visible?'modal-content-in':'modal-content-out']">
      <!-- header -->
      <div class="modal-header">
        {{title}}
        <span class="iconfont icon-times modal-close-btn" @click="close()"></span>
      </div>
      <!-- body -->
      <div class="modal-body">
        <slot></slot>
      </div>
      <!-- footer -->
      <div class="modal-footer">
        <slot name="footer">
          <r-button type="default" @click="cancel">{{cancelText}}</r-button>
          <r-button type="primary" @click="ok">{{okText}}</r-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import RButton from "./Button.vue";

export default {
  name: "Modal",
  components: {
    RButton
  },
  model: {
    prop: ["visible"]
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Title"
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {
    // 如果使用了v-if则需要在this.$nextTick中获取
    // this.$nextTick(() => {
    //   this.$refs.modals.addEventListener("animationend", e => {
    //     if (e.animationName.indexOf("fadeOut") > -1) {
    //       this.$emit("close", !this.visible);
    //     }
    //   });
    // });
    // console.log(`created`);
    // console.log(this.$slots);
    // this.$nextTick(() => {
    //   console.log(`$nextTick`);
    //   console.log(this.$slots);
    // });
  },
  mounted() {
    // console.log(`mounted`);
  },
  methods: {
    ok() {
      this.$emit("ok");
    },
    cancel() {
      this.close();
    },
    close() {
      this.$el.firstElementChild.classList.replace(
        "modal-shade-fadeIn",
        "modal-shade-fadeOut"
      );
      this.$el.lastElementChild.classList.replace(
        "modal-content-in",
        "modal-content-out"
      );

      setTimeout(() => {
        // document.removeEventListener("keydown", this.escEvent);
        this.$emit("close", !this.visible);
      }, 400);
      // this.$destroy();
    },
    escEvent(e) {
      if (e.key == "Escape") {
        this.close();
      }
    }
  },
  watch: {
    visible: function(val) {
      if (val) {
        document.addEventListener("keydown", this.escEvent);
      } else {
        document.removeEventListener("keydown", this.escEvent);
      }
    }
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
    // this.$emit("close", !this.visible);
    //  document.removeEventListener("keydown", this.escEvent);
  },
  destroyed() {
    // console.log("销毁Modal");
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  z-index: 100;
}

.modal-content {
  position: fixed;
  width: 500px;
  height: auto;
  background: #fff;
  left: 50%;
  top: 50%;
  // transform: translate(-250px, -150px);
  margin-left: -250px;
  margin-top: -180px;
  border-radius: 4px;
  z-index: 1001;
}

.modal-content-in {
  animation: modalCoutentIn 0.3s;
}

@keyframes modalCoutentIn {
  0% {
    margin-top: -210px;
    opacity: 0;
  }
  100% {
    margin-top: -180px;
    opacity: 1;
  }
}

.modal-content-out {
  animation: modalCoutentOut 0.3s;
  animation-fill-mode: forwards;
}

@keyframes modalCoutentOut {
  0% {
    margin-top: -180px;
    opacity: 1;
  }
  100% {
    margin-top: -210px;
    opacity: 0;
  }
}

.modal {
  &-header {
    padding: 16px 24px;
    border-bottom: 1px solid #ddd;
  }

  &-close-btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 16px;
    cursor: pointer;
  }

  &-body {
    padding: 24px;
  }

  &-footer {
    text-align: right;
    padding: 10px 16px;
    border-top: 1px solid #ddd;
  }
}

.modal-shade {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
  z-index: 1000;
  // opacity: 0.4;
}

.modal-shade-fadeIn {
  animation: fadeIn 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
}

.modal-shade-fadeOut {
  animation: fadeOut 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
  }
}
</style>