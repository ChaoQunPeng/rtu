<template>
  <span>
    <div style="position:fixed;left:300px;top:0;z-index:1000;">插件123</div>
  </span>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      styleObject: {
        width: this.block ? "100%" : "auto"
      }
    };
  },
  created() {},
  methods: {
    click() {}
  }
};
</script>

<style lang="less"  scoped>
</style>