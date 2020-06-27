
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
    },
    title: {
      type: Object | Function
    },
    body: {
      type: Object | Function
    },
    footer: {
      type: Object | Function
    },
    onOk: {
      type: Function
    }
  },
  data() {
    return {};
  },
  methods: {
    ok() {
      console.log(`okok`);
      this.$emit("ok");
    },
    cancel() {
      this.close();
    },
    // el 整个modal
    close(el) {
      const element = el && el instanceof HTMLElement ? el : this.$el;

      const modalShade = element.firstElementChild;
      const modalContent = element.lastElementChild;

      modalShade.classList.replace("modal-shade-fadeIn", "modal-shade-fadeOut");
      modalContent.classList.replace("modal-content-in", "modal-content-out");

      setTimeout(() => {
        this.$emit("close", !this.visible);
        // 这个为true说明是通过this.$modal()方式调用的
        if (this.isPluginCall) {
          this.$destroy();
        }
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
      if (val) {
        document.addEventListener("keydown", this.escEvent);
      } else {
        document.removeEventListener("keydown", this.escEvent);

        // this.$el 这个动画不知道要不要做
        const element = this.$el;

        const modalShade = element.firstElementChild;
        const modalContent = element.lastElementChild;

        modalShade.classList.replace(
          "modal-shade-fadeIn",
          "modal-shade-fadeOut"
        );
        modalContent.classList.replace("modal-content-in", "modal-content-out");
      }
    }
  },
  destroyed() {
    this.$el.remove();
  },
  render: function(h, context) {
    const vm = this;
    const { ok, close, $slots, onOk } = this;
    let title, body, footer;

    const ModalHeader = {
      props: {
        content: {
          type: Object | String,
          default: "Title"
        }
      },
      methods: {},
      render() {
        return (
          <div class="modal-header">
            {this.content}
            <span
              class="iconfont icon-times modal-close-btn"
              onClick={close}
            ></span>
          </div>
        );
      }
    };

    const ModalBody = {
      props: ["content"],
      render() {
        const maxHeight = window.innerHeight - 200 + "px";
        const style = {
          "max-height": maxHeight
        };

        return (
          <div style={style} class="modal-body">
            {this.content}
          </div>
        );
      }
    };

    const ModalFooter = {
      props: {
        content: {
          type: Object | String,
          default: "Footer"
        },
        cancel: {
          type: Function
        }
      },
      render() {
        return (
          <div class="modal-footer">
            <button v-pcq-button onClick={close}>
              关闭
            </button>
            &nbsp;
            <button v-pcq-button btnType="primary" onClick={onOk || ok}>
              确定
            </button>
          </div>
        );
      }
    };

    // debugger;
    title = checkType(this.title, "说明");
    body = checkType(this.body, "default");
    footer = checkType(this.footer, "footer");

    function checkType(obj, slotName) {
      if (isVNode(obj)) {
        return obj;
      } else if (typeof obj === "function") {
        return obj();
      } else if (typeof obj === "string") {
        return obj;
      } else if (typeof obj === "undefined") {
        // 没有任何参数的情况下
        if ($slots[slotName]) {
          return $slots[slotName];
        } else if (slotName == "footer") {
          return <ModalFooter />;
        }
      }
    }

    function isVNode(obj) {
      let vnode = vm.$createElement("div", "");
      let VNode = vnode.constructor;
      const isVNode = obj => obj instanceof VNode;
      return isVNode(obj);
    }

    /**
     * 这里this输出是 Proxy [[Handler]]: Object [[Target]]: VueComponent [[IsRevoked]]: false
     * 但是 this.$data this.$slot 这些还是指向当前的Vue实例
     */
    // console.log(this);

    if (this.visible) {
      return (
        <div class="modal" ref="modalIns">
          <div
            class="modal-shade modal-shade-fadeIn"
            onClick={() => close(this.$el)}
          ></div>
          <div class="modal-content modal-content-in" style="min-height:50px;">
            <ModalHeader content={title} />
            <ModalBody content={body} />
            <ModalFooter content={title} />
          </div>
        </div>
      );
    }
  }
};
</script>