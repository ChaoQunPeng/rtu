<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{name}}</h2>

    <input type="text" id="title" v-model="title" placeholder="一句话" />
    <input type="number" v-model="spendTime" placeholder="花费了多少分钟" />
    <select v-model="exp" placeholder="经验">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <textarea id="content" v-model="content" placeholder="这里以后替换成CKeditor" style="resize:none"></textarea>

    <button class="btn btn-primary display-block" @click="update()">修改</button>
  </div>
</template>
	
<script>
import axios from "axios";

export default {
  name: "edit",
  data() {
    return {
      name: "",
      title: "",
      content: "",
      exp: 1,
      time: 0,
      item: {},
      spendTime: null,
      editedData: null
    };
  },
  created() {
    this.editedData = this.$route.params;
    console.log(this.editedData);
    this.title = this.editedData.Title;
    this.content = this.editedData.Content;
    this.spendTime = this.editedData.SpendTime;
    this.exp = this.editedData.Exp;
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
			
				