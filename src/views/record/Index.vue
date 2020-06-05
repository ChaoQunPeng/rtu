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
import RButton from "../../components/Button.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { alertMessage } from "../../utils/alert-message.js";
import dayjs from "dayjs";

export default {
  name: "record",
  data() {
    return {
      skillName: "",
      title: "",
      content: "",
      exp: 0,
      item: {},
      startTime: null,
      endTime: null,
      editor: ClassicEditor
    };
  },
  components: {
    RButton
  },
  created() {
    this.item = this.$route.params;
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

    this.startTime = `${dayjs().format("YYYY-MM-DD")}T00:00`;
    this.endTime = dayjs().format("YYYY-MM-DDTHH:mm");

    this.$axios.post({url:'www'});
    console.log();
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
          this.$message("新增成功！");
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
    },
    getExpByDiffTime(val) {
      let startTime = dayjs(this.startTime);
      let endTime = dayjs(this.endTime);
      const data = { month: 0, day: 0, hour: 0, minute: 0 };

      for (const unit in data) {
        data[unit] = endTime.diff(startTime, unit);
      }

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
      this.exp = data.hour;
    }
  },
  destroyed() {
    document.removeEventListener("keydown", this.handleEve);
    // console.log("删除监听");

    window.onbeforeunload = function() {};
  },
  computed: {}
};
</script>


<style lang="less" scoped>
</style>