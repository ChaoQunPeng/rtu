<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{sn}}</h2>
    <input type="number" v-model="spendTime" placeholder="花费了多少分钟" />
    <select v-model="exp">
      <option value hidden>--请选择--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <input type="text" id="title" v-model="title" placeholder="一句话" />
    <!-- <textarea id="content" v-model="content" placeholder="这里以后替换成CKeditor" style="resize:none"></textarea> -->

    <div style="margin-bottom:30px">
      <ckeditor :editor="editor" v-model="content"></ckeditor>
    </div>

    <r-button type="light-blue" block @click.native="plus1()">Plus 1</r-button>
  </div>
</template>


<script>
import axios from "axios";
import RButton from "../../components/common/Button.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "record",
  data() {
    return {
      sn:"",
      title: "",
      content: "",
      exp: "",
      time: 0,
      item: {},
      spendTime: null,
      editor: ClassicEditor
    };
  },
  components: {
    RButton
  },
  created() {
    this.item = this.$route.params;
    this.sn = this.$route.params.sn;
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