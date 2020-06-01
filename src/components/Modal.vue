<template>
  <div ref="modals" class="modal" v-show="visible">
    <!-- {'modal-shade-active':visible} -->
    <div
      class="modal-shade"
      :class="[visible?'modal-shade-fadeIn':'modal-shade-fadeOut']"
      @click="close()"
    ></div>
    <div class="modal-content" :class="[visible?'modal-content-in':'modal-content-out']">
      <!-- header -->
      <div class="modal-header">
        Title
        <span class="iconfont icon-times modal-close-btn" @click="close()"></span>
      </div>
      <!-- body -->
      <div class="modal-body">
        <slot></slot>
      </div>
      <!-- footer -->
      <div class="modal-footer">
        <button class="btn btn-primary float-right" @click="ok()">{{okText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  model: {
    prop: ["visible"]
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      title: ""
    };
  },
  created() {
    // 如果使用了v-if则需要在this.$nextTick中获取
    // this.$nextTick(() => {
    //   this.$refs.modals.addEventListener("animationend", e => {
    //     if (e.animationName.indexOf("fadeOut") > -1) {
    //       this.$emit("close", !this.visible);
    //     }
    //   });
    // });
  },
  methods: {
    handleModal() {
      this.$emit("close", !this.visible);
    },
    ok() {
      this.$emit("ok");
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
        this.$emit("close", !this.visible);
      }, 400);
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
}

.modal-content {
  position: fixed;
  width: 500px;
  height: auto;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-250px, -150px);
  // padding: 30px;
  border-radius: 4px;
}

.modal-content-in {
  animation: modalCoutentIn 0.3s;
}

@keyframes modalCoutentIn {
  0% {
    transform: translate(-250px, -200px);
    opacity: 0;
  }
  100% {
    transform: translate(-250px, -150px);
    opacity: 1;
  }
}

.modal-content-out {
  animation: modalCoutentOut 0.3s;
  animation-fill-mode: forwards;
}

@keyframes modalCoutentOut {
  0% {
    transform: translate(-250px, -150px);
    opacity: 1;
  }
  100% {
    transform: translate(-250px, -200px);
    opacity: 0;
  }
}

.modal {
  &-header {
    padding: 16px 24px;
    border: 1px solid #ddd;
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
  }
}

.modal-shade {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
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