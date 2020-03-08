<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{title}}</h2>
    <input type="text" id="overview" v-model="overview" placeholder="一句话" />
    <textarea id="content" v-model="content" placeholder="这里以后替换成CKeditor" style="resize:none"></textarea>

    <button class="btn btn-primary display-block" @click="plus1()">Plus 1</button>
  </div>
</template>


<script>
export default {
  name: "record",
  data() {
    return {
      overview: "",
      content: "",
      title: ""
    };
  },
  created() {
    console.log(this.$route);
    console.log(this.$router);
    this.title = this.$route.query.n;
  },
  methods: {
    plus1() {
      const id = this.$route.params.id;
      // this.$router.push({ path: `/detail/${id}` });
      this.$store.commit("plus1", {
        id: id,
        overview: this.overview,
        content: this.content
      });

      this.$router.push({ path: `/detail/${id}` });
    }
  }
};
</script>


<style lang="less" scoped>
</style>