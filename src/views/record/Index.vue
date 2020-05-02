<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{name}}</h2>
    <input type="number" v-model="spendTime" placeholder="花费了多少分钟" />
    <select v-model="exp" placeholder="经验">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <input type="text" id="title" v-model="title" placeholder="一句话" />
    <textarea id="content" v-model="content" placeholder="这里以后替换成CKeditor" style="resize:none"></textarea>

    <button class="btn btn-primary display-block" @click="plus1()">Plus 1</button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  // name: "record",
  data() {
    return {
      title: "",
      content: "",
      exp: 1,
      time: 0,
      item: {},
      spendTime: null
    };
  },
  created() {
    this.item = this.$route.params;
    this.name = this.$route.params.name;
    console.log(this.$route);
  },
  methods: {
    plus1() {
      axios
        .post(`experience/record`, {
          title: this.title,
          content: this.content,
          skillId: this.item.id,
          exp: this.exp,
          spendTime: this.spendTime
        })
        .then(
          res => {
            this.$router.push({ path: `/detail/${this.item.id}` });
          },
          err => {
            alert("失败！");
          }
        );
    }
  }
};
</script>


<style lang="less" scoped>
</style>