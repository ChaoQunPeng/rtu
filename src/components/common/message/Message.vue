<template>
  <div class="message">
    <div class="fadeIn" :class="type">
      <div class="message-content">{{content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      content: "",
      type: ""
    };
  },
  created() {},
  mounted() {
    console.log(this.$data);
    // setTimeout(() => {
    //   this.$el.firstElementChild.classList.replace("fadeIn", "fadeOut");
    //   this.destroy();
    // }, 2000);
  },
  methods: {
    destroy() {
      setTimeout(() => {
        this.$destroy();
        this.$el.remove();
      }, 500);
    }
  }
};
</script> 

<style lang="less" scoped>
.message {
  width: 100%;
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