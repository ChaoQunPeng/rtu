<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{skillName}}</h2>
    <input type="text" id="title" v-model="title" placeholder="一句话" />

    <input type="number" v-model="spendTime" placeholder="花费了多少分钟" />
    <select v-model="exp">
      <option value disabled>--请选择--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!-- <textarea id="content" v-model="content" placeholder="这里以后替换成CKeditor" style="resize:none"></textarea> -->

    <div style="margin-bottom:30px">
      <ckeditor ref="ck" :editor="editor" v-model="content"></ckeditor>
    </div>

    <r-button type="light-blue" block @click.native="plus1()">Plus 1</r-button>
  </div>
</template>


<script>
import axios from "axios";
import RButton from "../../components/Button.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { alertMessage } from "../../utils/alert-message.js";

export default {
  name: "record",
  data() {
    return {
      skillName: "",
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
    this.skillName = this.$route.query.skillName;
  },
  mounted() {
    document.addEventListener("keydown", this.handleEve);
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
        .then(res => {
          alertMessage(res.data.code, "新增成功！", res.data.msg);
        });
    },
    handleEve(e) {
      if (e.ctrlKey && e.key == "s") {
        console.log(`Ctrl+S`);
        e.preventDefault();
      }
    }
  },
  destroyed() {
    document.removeEventListener("keydown", this.handleEve);
    console.log("删除监听");
  }
};
</script>


<style lang="less" scoped>
</style>