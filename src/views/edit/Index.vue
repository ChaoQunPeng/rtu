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

    <!-- <label>小时数：{{spendTime | toHour}}</label> -->

    <div style="margin-bottom:30px">
      <ckeditor ref="ck" :editor="editor" v-model="content"></ckeditor>
    </div>

    <r-button type="light-blue" block @click.native="update()">Plus 1</r-button>
  </div>
</template>
	
<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import RButton from "../../components/Button.vue";
import dayjs from "dayjs";

export default {
  name: "edit",
  components: {
    RButton
  },
  data() {
    return {
      skillName: "",
      title: "",
      content: "",
      exp: 0,
      item: {},
      startTime: null,
      endTime: null,
      spendTime: 0,
      editedData: null,
      editor: ClassicEditor
    };
  },
  created() {
    this.editedData = this.$route.params;
    this.title = this.$route.params.Title;
    this.content = this.editedData.Content;
    this.startTime = dayjs(this.editedData.StartTime).format("YYYY-MM-DDTHH:mm");
    this.endTime = dayjs(this.editedData.EndTime).format("YYYY-MM-DDTHH:mm");
    this.exp = this.editedData.Exp;
    this.skillName = this.$route.query.skillName;

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
  methods: {
    update() {
      axios
        .put(`experience/${this.editedData.ExperienceID}`, {
          title: this.title,
          content: this.content,
          exp: this.exp,
          startTime: this.startTime,
          endTime: this.endTime
        })
        .then(
          res => {
            this.$message(`修改成功！`);
          },
          err => {
            this.$message(`修改失败！`);
          }
        );
    },
    getExpByDiffTime() {
      let startTime = dayjs(this.startTime);
      let endTime = dayjs(this.endTime);
      const data = { month: 0, day: 0, hour: 0, minute: 0 };

      for (const unit in data) {
        data[unit] = endTime.diff(startTime, unit);
      }

      this.spendTime = data.minute;
      // 有些时候可能未满1个小时，按1点经验算
      if (data.hour == 0 && data.minute > 0) {
        this.exp = 1;
        return;
      }

      // 结束时间小于开始时间的话data.hour为负数，但是这里要显示为0
      if (data.hour < 0) {
        this.exp = 0;
        return;
      }

      // 以分钟为单位计入花费时间
      this.exp = data.hour;
    }
  },
  destroyed() {
    window.onbeforeunload = function() {};
  }
};
</script>

<style lang="less">
</style>
			
				