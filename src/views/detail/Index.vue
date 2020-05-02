<template>
  <div class="detail">
    <!-- <router-link to="/home" replace>Go to Home</router-link> -->
    <div class="pcq-layout">
      <div style="width:250px;margin-right:30px">
        <div class="name text-center">{{headline}}</div>
        <!-- <div class="exp">
          <span>{{item.exp}}</span>
        </div>-->

        <div class="halo">
          <p>{{computeExp}}</p>
          <div></div>
        </div>

        <button class="plus1" @click="goRecord()">Level Up!</button>
      </div>
      <div style="background:#fff;flex:1;padding:20px;border-radius:6px;display:flex;">
        <div class="exp-container clearfix">
          <div v-for="(arr,index) in item" :key="index" class="exp-container-item">
            <div class="exp">{{arr.Exp}}</div>
            <div>
              <div class="title">{{arr.Title}}</div>
              <div class="content">{{arr.Content}}</div>
              <div class="date">
                <a @click="editExp(arr)">编辑</a>
                |
                <a @click="delExp(arr)">删除</a>
                |
                2020-03-09
                <!-- <i class="iconfont icon-ellipsis-vertical"></i> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
	
<script>
import axios from "axios";
export default {
  name: "detail",
  data() {
    return {
      item: [],
      title: "",
      content: "",
      headline: ""
    };
  },
  computed: {
    computeExp: function() {
      let exp = 0;
      this.item.forEach(e => {
        exp += e.Exp;
      });
      console.log(exp);
      return exp;
    }
  },
  created() {
    this.initData();
    this.headline = this.$route.query.n;
  },
  methods: {
    initData() {
      let queryParamsId = this.$router.currentRoute.params["id"];
      axios.get(`experience/${queryParamsId}`).then(res => {
        this.item = res.data.data;
      });
    },
    plus1() {
      this.item.items.push({ overview: this.overview, content: this.content });
      this.item.exp = this.item.items.length;
    },
    goRecord() {
      this.$router.push({
        name: `record`,
        params: this.item
      });
    },
    editExp(arr) {
      this.$router.push({
        name: `edit`,
        params: arr
      });
    },
    delExp(arr) {
      const value = confirm(`您确定要删除${arr.Title}吗？`);
      if (value) {
        axios.delete(`experience/${arr.ExperienceID}`).then(
          res => {
            this.initData();
            alert(`删除成功!`);
          },
          err => {
            alert(`删除失败!`);
          }
        );
      }
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
    color: #183055;
    z-index: 1000;
  }
  > div {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    border: 10px solid #183055;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: #183055;
    box-shadow: inset 0px 0px 2px 0px #fff;
    border-radius: 0 50% 50% 50%;
    transform: rotate(45deg);
    &:nth-of-type(1) {
    }
    &:nth-of-type(2) {
      animation: haloAni2 3s infinite linear;
    }
    &:nth-of-type(3) {
      animation: haloAni3 3s infinite linear;
    }
  }
}

@keyframes haloAni1 {
  0% {
    transform: rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  50% {
    transform: rotate(180deg);
    border-radius: 60% 43% 40% 45%;
  }
  75% {
    transform: rotate(270deg) scale(0.95, 0.95);
    border-radius: 45% 43% 49% 45%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 50% 50% 50% 50%;
  }
}

@keyframes haloAni2 {
  0% {
    transform: rotate(0);
    border-radius: 50% 50% 50% 50%;
  }
  50% {
    border-radius: 45% 46% 49% 54%;
  }
  75% {
    transform: rotate(0) scale(0.95, 0.95);
    border-radius: 51% 52% 48% 48%;
  }
  100% {
    transform: rotate(0);
    border-radius: 50% 50% 50% 50%;
  }
}

@keyframes haloAni3 {
  0% {
    transform: rotate(0);
    border-radius: 50% 50% 50% 50%;
  }
  50% {
    border-radius: 55% 46% 55% 45%;
  }
  75% {
    transform: rotate(0) scale(0.95, 0.95);
    border-radius: 53% 45% 52% 48%;
  }
  100% {
    transform: rotate(0);
    border-radius: 50% 50% 50% 50%;
  }
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: #183055;
  margin-bottom: 20px;
}

.exp {
  // font-size: 40px;
  // font-weight: 700;
  // border: 5px solid #2d318f;
  // width: 160px;
  // height: 160px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // border-radius: 0 42.6% 44.6% 41.6%;
  // margin: 0 auto;
  // color: #fff;
  // /* background: #2d318f; */
  // box-shadow: 0 0 12px #2d318f;
  // transform: rotate(-77deg);
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
  background: #f1f1f1;
  min-height: 60px;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;

  .exp {
    font-size: 14px;
  }

  .title {
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .content {
    color: #666;
    font-size: 16px;
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
			
				