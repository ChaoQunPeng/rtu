<template>
  <div>
    <h1 style="color:#fff;" class="mb-3">回收站</h1>

    <div class="background">
      <h3 class="mb-5">
        <span>数量：{{listData.length}}条</span>
      </h3>
      <table>
        <thead>
          <tr>
            <th width="80px">标识</th>
            <th>技能名称</th>
            <th>经验标题</th>
            <th>经验内容</th>
            <th width="100px">经验值</th>
            <th>写入日期</th>
            <th width="180px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in listData" :key="index">
            <td>
              {{index+1}}
              <!-- {{data.ExperienceID}} -->
            </td>
            <td>{{data.Name}}</td>
            <td class="text-left" style="text-align:left;" v-text-ellipsis>{{data.Title}}</td>
            <td class="text-left">{{data.Content}}</td>
            <td>{{data.Exp}}</td>
            <td>{{data.CreateDate | dateFormat("YYYY-MM-DD HH:mm:ss")}}</td>
            <td>
              <a @click="restoreExp(data)">恢复</a> |
              <a @click="realDelete(data)">彻底删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "recycle",
  data() {
    return {
      listData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get(`experience/recycle`).then(res => {
        this.listData = res.data.data;
      });
    },
    realDelete(data) {
      const answer = confirm(
        `您确定要彻底删除${data.Name}下的${data.Title}吗？`
      );
      if (!answer) return;

      axios
        .delete(`experience/real/${data.ExperienceID}`)
        .then(res => {
          this.$message.success("已彻底删除！");
          this.getList();
        })
        .catch(err => {
          this.$message.error("删除失败！");
        });
    },
    restoreExp(data) {
      const answer = confirm(
        `您确定要恢复${data.Name}下的${data.Title}这条经验吗？`
      );
      if (!answer) return;
      axios
        .put(`experience/restore/${data.ExperienceID}`)
        .then(res => {
          this.$message.success("已成功恢复！");
          this.getList();
        })
        .catch(err => {
          this.$message.error("恢复失败！");
        });
    }
  }
};
</script>

<style lang="less" scoped>
@table-border-color: #18355a;

.background {
  background: #fff;
  padding: 30px;
  margin-right: 60px;
  margin-bottom: 60px;
}

table {
  border-collapse: collapse;
  width: 100%;

  > thead {
    > tr {
      > th {
        border: 1px solid;
        color: @table-border-color;
        padding: 16px;
        text-align: center;
      }
    }
  }

  > tbody {
    > tr {
      > td {
        border: 1px solid;
        color: @table-border-color;
        padding: 16px;
        text-align: center;
      }
    }
  }
}
</style>