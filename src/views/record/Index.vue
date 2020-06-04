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

    // window.isCloseHint = true;
    // //初始化关闭
    // window.addEventListener("beforeunload", function(e) {
    //   if (window.isCloseHint) {
    //     var confirmationMessage = "要记得保存！你确定要离开我吗？";
    //     console.log(e);
    //     console.log(window.event);
    //     (e || window.event).returnValue = confirmationMessage;
    //     return confirmationMessage;
    //   }
    // });

    window.onbeforeunload = function(e) {
      e = e || window.event;
      if (e) {
        // 按照标准取消事件
        e.returnValue = "";
      }
      // Chrome需要设置returnValue。
      e.preventDefault();
      return "";
    };
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
        // alert(`Ctrl+S 保存`);
        this.$message("Ctrl+S");
        // this.$message.info();
        e.preventDefault();
      }
      // else if (e.key == "F5") {
      //   let options = confirm("内容尚未保存，确定要刷新页面吗？");
      //   if (!options) e.preventDefault();
      // } else if (e.ctrlKey && e.key == "r") {
      //   let options = confirm("内容尚未保存，确定要刷新页面吗？");
      //   if (!options) e.preventDefault();
      // }
    }
  },
  destroyed() {
    document.removeEventListener("keydown", this.handleEve);
    // console.log("删除监听");

    window.onbeforeunload = function() {};
  }
};
</script>


<style lang="less" scoped>
</style>