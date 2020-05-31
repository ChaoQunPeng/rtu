<template>
  <div ref="modals" class="modal" v-show="visible">
    <!-- {'modal-shade-active':visible} -->
    <div
      class="modal-shade"
      :class="[visible?'modal-shade-fadeIn':'modal-shade-fadeOut']"
      @click="close()"
    ></div>
    <div class="modal-body">
      <i class="iconfont icon-times modal-close" @click="handleModal()"></i>
      <input class="modal-input" type="text" v-model="title" />
      <button class="btn btn-primary float-right" @click="addedCard()">新增</button>
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
    //       // setTimeout(() => {
    //       //   this.$el.firstElementChild.classList.remove("modal-shade-fadeOut");
    //       //   this.$emit("close", !this.visible);
    //       // }, 500);
    //     }
    //   });
    // });
  },
  methods: {
    handleModal() {
      this.$emit("close", !this.visible);
    },
    close() {
      // this.$emit("close", false);
      // this.$el.firstElementChild.classList.replace("modal-shade-fadeOut","modal-shade-fadeIn");
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
}

.modal-body {
  position: fixed;
  width: 500px;
  height: auto;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-250px, -150px);
  padding: 30px;
  border-radius: 6px;
  animation: modalBody 0.3s;
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

.modal-close {
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
}
</style>