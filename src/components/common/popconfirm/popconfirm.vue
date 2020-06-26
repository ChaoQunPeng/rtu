<script>
export default {
  data() {
    return {
      isTrigger: false
    };
  },
  props: {
    content: {
      type: String | Object | Function
    }
  },
  methods: {
    ok() {
      // btnVnode.elm.dispatchEvent(new CustomEvent(`popOk`, { detail: `eventData` }));
    },
    close() {
      this.$destroy();
    },
    prevent(event) {
      // 阻止父元素事件，防止父元素再次触发click事件
      event.stopPropagation();
    }
  },
  destroyed() {
    console.log(`销毁`);
    this.isTrigger = false;
    this.$el.remove();
  },
  render() {
    this.isTrigger = true;

    const footer = (
      <div class="pcq-popconfirm-footer">
        <button onClick={this.close}>取消</button>
        <button onClick={this.ok}>确定</button>
      </div>
    );

    return (
      <div class="pcq-popconfirm-wrap">
        <div class="overlay"></div>
        <div class="pcq-popconfirm" onClick={this.prevent}>
          <div class="pcq-popconfirm-content">{this.content}</div>
          {footer}
        </div>
      </div>
    );
  }
};
</script>