
<script>
import RButton from "../Button.vue";

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
    header: {
      type: Object | Function
    },
    body: {
      type: Object | Function
    },
    footer: {
      type: Object | Function
    }
  },
  components: {
    RButton
  },
  data() {
    return {};
  },
  methods: {
    ok() {
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
    },
    renderContent() {}
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
  destroyed() {
    this.$el.remove();
  },
  render: function(h) {
    const { close } = this;
    let header, body, footer;

    if (this.isPluginCall) {

      header = checkType(this.header);
      body = checkType(this.body);
      footer = checkType(this.footer);

    } else {
      header = this.header || this.$slots.header;
      body = this.body || this.$slots.default;
      footer = this.footer || this.$slots.footer;
    }

    function checkType(obj) {
      let o;
      if (typeof obj === "function") {
        o = obj();
      } else if (typeof obj === "string") {
        o = obj;
      }
      return o;
    }

    /**
     * 这里this输出是 Proxy [[Handler]]: Object [[Target]]: VueComponent [[IsRevoked]]: false
     * 但是 this.$data this.$slot 这些还是指向当前的Vue实例
     */
    // console.log(this);

    const ModalHeader = {
      props: {
        content: {
          type: Object | String,
          default: "Title"
        }
      },
      methods: {
        click() {
          close();
        }
      },
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
        return <div class="modal-body">{this.content}</div>;
      }
    };

    const ModalFooter = {
      props: {
        content: {
          type: Object | String,
          default: "Footer"
        }
      },
      render() {
        return <div class="modal-footer">{this.content}</div>;
      }
    };

    if (this.visible) {
      return (
        <div class="modal" ref="modalIns">
          <div
            class="modal-shade modal-shade-fadeIn"
            onClick={() => close(this.$el)}
          ></div>
          <div class="modal-content modal-content-in" style="min-height:50px;">
            <ModalHeader content={header} />
            <ModalBody content={body} />
            <ModalFooter content={footer} />
          </div>
        </div>
      );
    }
  }
};
</script>