<template>
  <div class="detail">
    <!-- <router-link to="/home" replace>Go to Home</router-link> -->
    <div class="pcq-layout">
      <div style="width:250px;margin-right:30px">
        <div class="name text-center">{{headline}}</div>

        <div class="halo">
          <p>{{computeExp}}</p>
          <div></div>
        </div>

        <button v-pcq-button btnType="primary" class="block" @click="goRecord()">Level Up!</button>
      </div>
      <div style="background:#fff;flex:1;padding:20px;border-radius:6px;display:flex;">
        <div class="exp-container clearfix">
          <div v-for="(arr,index) in item" :key="index" class="exp-container-item">
            <div class="exp-box">
              <div class="exp">{{arr.Exp}}</div>
            </div>
            <div style="flex:1;">
              <div class="title">{{arr.Title}}</div>
              <div class="content">{{arr.Content}}</div>
              <div class="date">
                <a @click="editExp(arr)">编辑</a>
                |
                <a
                  v-pcq-popconfirm
                  pcqPopconfirmTitle="您确定要删除这条经验吗？"
                  @onConfirm="confirmDel(arr)"
                >删除</a>
                |
                2020-03-09
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
	
<script>
import axios from 'axios';
import trimHtml from 'trim-html';

export default {
  name: 'detail',
  data() {
    return {
      item: [],
      title: '',
      content: '',
      headline: ''
    };
  },
  computed: {
    computeExp: function() {
      let exp = 0;
      this.item.forEach(e => {
        exp += e.Exp;
      });
      return exp;
    }
  },
  created() {
    this.initData();
    this.headline = this.$route.query.skillName;
  },
  methods: {
    confirmDel(item) {
      this.delExp(item);
    },
    initData() {
      let queryParamsId = this.$router.currentRoute.params['id'];
      axios.get(`experience/${queryParamsId}`).then(res => {
        this.item = res.data.data;
        this.item.forEach(e => {
          // 不能这么干，要弄成一个过滤器，因为我后面直接用的就是这里的数据
          e.Content = trimHtml(e.Content, {
            limit: 200,
            preserveTags: false
          }).html;
        });
      });
    },
    plus1() {
      this.item.items.push({ overview: this.overview, content: this.content });
      this.item.exp = this.item.items.length;
    },
    goRecord() {
      this.$router.push({
        name: `record`,
        query: {
          skillName: this.$route.query.skillName
        }
      });
    },
    editExp(item) {
      this.$router.push({
        path: `/edit/${item.ExperienceID}`,
        params: {
          ...JSON.parse(JSON.stringify(item))
        },
        query: {
          skillName: this.$route.query.skillName
        }
      });
    },
    delExp(item) {
      axios.delete(`experience/${item.ExperienceID}`).then(
        res => {
          this.initData();
          this.$message.success(`删除成功！`);
        },
        err => {
          this.$message.error(`删除失败！`);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.halo {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 50px auto 30px auto;

  p {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    color: var(--primary);
    z-index: 1000;
  }

  > div {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    border: 10px solid var(--primary);
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: #183055;
    box-shadow: inset 0px 0px 2px 0px var(--primary);
    border-radius: 0 50% 50% 50%;
    transform: rotate(45deg);
  }
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
}

.exp-container {
  flex: 1;
  padding-left: 20px;

  > span {
    float: left;
    border: 1px solid;
    width: 20px;
    text-align: center;
  }
}

.exp-container-item {
  position: relative;
  display: flex;
  background: #f1f1f1;
  min-height: 60px;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;
  max-height: 135px;

  .exp-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    border: 3px solid;
    margin-right: 15px;
    height: 90px;
    border-radius: 50%;
    font-size: 40px;
  }

  .title {
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .content {
    color: #666;
    font-size: 14px;
    line-height: 1.8;
    // 多行文字换行，兼容性不太好
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .date {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
}

.plus1 {
  display: block;
  width: 100%;
  background: #3884ff;
  color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  border: 1px solid #3884ff;
  transition: all 0.5s;
  
  &:active {
    background: #353989;
  }
}
</style>
			
				