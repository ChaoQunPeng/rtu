<template>
  <div class="navbar">
    <div>
      <i class="iconfont icon-angle-left" @click="back()"></i>
    </div>
    <div>
      <i class="iconfont icon-angle-right" @click="forward()"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$axios
        .get(`experience/info`, { globalLoading: false })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          // console.log(JSON.stringify(err));
        });
    },
    forward() {
      this.$router.go(1);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  > div {
    display: inline-block;
    cursor: pointer;
    color: #fff;
  }
}
</style>