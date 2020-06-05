<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{skillName}}</h2>

    <label class="block">
      经验标题：
      <input type="text" id="title" v-model="title" placeholder="标题" style="width:80%;" />
    </label>

    <label for>
      开始时间：
      <input
        style="width: 240px;"
        type="datetime-local"
        v-model="startTime"
        @input="getExpByDiffTime"
      />
    </label>
    <label for>
      结束时间：
      <input
        style="width: 240px;"
        type="datetime-local"
        v-model="endTime"
        @input="getExpByDiffTime"
      />
    </label>

    <label for>
      经验值：
      <input type="number" v-model="exp" placeholder="经验值" />
    </label>

    <div style="margin-bottom:30px">
      <ckeditor ref="ck" :editor="editor" v-model="content"></ckeditor>
    </div>

    <r-button type="light-blue" block @click.native="plus1()">Plus 1</r-button>
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
      exp: 0,
      // time: 0,
      item: {},
      startTime: null,
      endTime: null,
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
            this.$message(`修改成功！`);
          },
          err => {
            this.$message(`修改失败！`);
          }
        );
    }
  }
};
</script>

<style lang="less">
</style>
			
				