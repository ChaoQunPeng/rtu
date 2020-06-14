<template>
  <div ref="modals" class="modal" v-if="visible">
    <div
      class="modal-shade"
      :class="[
          visible?'modal-shade-fadeIn':'modal-shade-fadeOut'
        ]"
      @click="close()"
    ></div>
    <div
      class="modal-content"
      :class="[
      visible?'modal-content-in':'modal-content-out'
      ]"
    >
      <div class="modal-header">
        {{title}}
        <span class="iconfont icon-times modal-close-btn" @click="close()"></span>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
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
import RButton from "../Button.vue";

const p = {
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
  }
};

const ModalHeader = {
  props: ["title"],
  methods: {
    onClick() {
      alert("onClick");
    }
  },
  render() {
    return (
      <div class="modal-header">
        {this.title}
        <span
          class="iconfont icon-times modal-close-btn"
          onClick={this.onClick}
        ></span>
      </div>
    );
  }
};

const ModalBody = {
  render() {
    <div class="modal-body"></div>;
  }
};

const ModalFooter = {
  render(h) {
    return <div class="modal-footer"></div>;
  }
};

export default {
  name: "Modal",
  model: {
    prop: 'visible',
    event: 'change'
  },
  components: {
    RButton
  },
  data() {
    return {};
  },
  ...p,
  beforeCreate() {
    // this.$props = p;
  },
  created() {
    console.log(`this`);
  },
  mounted() {},
  methods: {
    ok() {
      this.$emit("ok");
    },
    cancel() {
      this.close();
    },
    // el 整个modal
    close(el) {
      const element = el || this.$el;

      const modalShade = element.firstElementChild;
      const modalContent = element.lastElementChild;

      modalShade.classList.replace("modal-shade-fadeIn", "modal-shade-fadeOut");
      modalContent.classList.replace("modal-content-in", "modal-content-out");

      setTimeout(() => {
        this.$emit("close", !this.visible);
        this.$destroy();
      }, 400); // 400ms,比渐入渐出的动画多100ms，等动画执行完毕才销毁
    },
    escEvent(e) {
      if (e.key == "Escape") {
        this.close();
      }
    }
  },
  watch: {
    visible: function(val) {
      debugger;
      console.log(val);
      if (val) {
        document.addEventListener("keydown", this.escEvent);
      } else {
        document.removeEventListener("keydown", this.escEvent);
      }
    }
  },
  beforeDestroy() {},
  destroyed() {
    this.$el.remove();
  }
  // render: function(h) {
  //   return (
  //     <div class="modal" ref="modalIns">
  //       <div
  //         class="modal-shade modal-shade-fadeIn"
  //         // 这里的this也是指向Vue实例
  //         onClick={() => this.close(this.$el)}
  //       ></div>
  //       <div class="modal-content modal-content-in">
  //         <ModalHeader title={"头部"} />
  //         <ModalBody />
  //         <ModalFooter />
  //       </div>
  //     </div>
  //   );
  // }
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
  min-height: 180px;
  background: #fff;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  // margin-top: -120px;
  border-radius: 4px;
  z-index: 1001;
}

.modal-content-in {
  animation: modalCoutentIn 0.3s;
  animation-fill-mode: forwards;
}

@keyframes modalCoutentIn {
  0% {
    margin-top: -300px;
    opacity: 0;
  }
  100% {
    margin-top: -270px;
    opacity: 1;
  }
}

.modal-content-out {
  animation: modalCoutentOut 0.3s;
  animation-fill-mode: forwards;
}

@keyframes modalCoutentOut {
  0% {
    margin-top: -270px;
    opacity: 1;
  }
  100% {
    margin-top: -300px;
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
  background: #000;
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

