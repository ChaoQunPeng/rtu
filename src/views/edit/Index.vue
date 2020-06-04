<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{skillName}}</h2>

    <input type="text" id="title" v-model="title" placeholder="一句话" />
    <input type="number" v-model="spendTime" placeholder="花费了多少分钟" />
    <select v-model="exp" placeholder="经验">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <div style="margin-bottom:30px">
      <ckeditor :editor="editor" v-model="content"></ckeditor>
    </div>

    <button class="btn btn-primary display-block" @click="update()">修改</button>
  </div>
</template>
	
<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "edit",
  data() {
    return {
      skillName: "",
      title: "",
      content: "",
      exp: 1,
      time: 0,
      item: {},
      spendTime: null,
      editedData: null,
      editor: ClassicEditor
    };
  },
  created() {
    this.editedData = this.$route.params;
    this.title = this.$route.params.Title;
    this.content = this.editedData.Content;
    this.spendTime = this.editedData.SpendTime;
    this.exp = this.editedData.Exp;
    this.skillName = this.$route.query.skillName;

    window.isCloseHint = true;
    //初始化关闭
    window.addEventListener("beforeunload", function(e) {
      if (window.isCloseHint) {
        var confirmationMessage = "要记得保存！你确定要离开我吗？";
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
  },
  methods: {
    update() {
      axios
        .put(`experience/${this.editedData.ExperienceID}`, {
          Title: this.title,
          Content: this.content,
          Exp: this.exp,
          SpendTime: this.spendTime
        })
        .then(
          res => {
            alert("修改成功！");
          },
          err => {
            alert("修改失败！");
          }
        );
    }
  }
};
</script>

<style lang="less">
</style>
			
				