<template>
  <div class="message fadeIn" :style="[componentTop]">
    <div class="message-content">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      content: "",
      componentCount: 0,
      componentTop: {
        top: 0
      }
    };
  },
  created() {},
  mounted() {
    this.componentTop.top = this.componentCount * 50 + "px";
    setTimeout(() => {
      this.$el.classList.replace("fadeIn", "fadeOut");
      setTimeout(() => {
        this.$destroy();
        this.$el.remove();
      }, 500);
    }, 2000);
  }
};
</script> 

<style lang="less" scoped>
@import url("../../assets/theme/animation.less");

.message {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding-top: 20px;
  text-align: center;

  &-content {
    display: inline-block;
    background: #fff;
    padding: 10px 16px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px var(--peace);
  }
}
</style>