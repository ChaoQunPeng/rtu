<template>
  <div class="detail">
    <!-- <router-link to="/home" replace>Go to Home</router-link> -->
    <div class="pcq-layout">
      <div style="width:250px;margin-right:30px">
        <div class="name text-center">{{item.name}}</div>
        <!-- <div class="exp">
          <span>{{item.exp}}</span>
        </div>-->

        <div class="halo">
          <p>{{this.item.exp}}</p>
          <div></div>
        </div>

        <button class="plus1" @click="goRecord()">Level Up!</button>
      </div>
      <div style="background:#fff;flex:1;padding:20px;border-radius:6px;display:flex;">
        <div class="exp-container clearfix">
          <div v-for="(arr,index) in item.items" :key="index" class="exp-container-item">
            <div>{{arr.overview}}</div>
            <div>{{arr.content}}</div>
            <div>2020-03-09</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
	
<script>
import { mockData } from "../mock.data.js";
export default {
  name: "detail",
  data() {
    return {
      list: mockData.list,
      item: {},
      overview: "",
      content: ""
    };
  },
  created() {
    let queryParamsId = this.$router.currentRoute.params["id"];
    this.item = this.$store.state.mockData.list.find(
      e => e.id == queryParamsId
    );
  },
  methods: {
    plus1() {
      this.item.items.push({ overview: this.overview, content: this.content });
      this.item.exp = this.item.items.length;
    },
    goRecord() {
      this.$router.push({
        path: `/record/${this.item.id}`,
        query: {
          n: this.item.name
        }
      });
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
      // animation: haloAni1 3s infinite linear;
      // &::before {
      //   content: "★";
      //   font-size: 16px;
      //   position: absolute;
      //   top: 40px;
      //   left: 18px;
      //   border-radius: 50%;
      // }
      // &::after {
      //   content: "★";
      //   font-size: 16px;
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   border-radius: 50%;
      // }
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
  font-size: 40px;
  font-weight: 700;
  border: 5px solid #2d318f;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 42.6% 44.6% 41.6%;
  margin: 0 auto;
  color: #fff;
  /* background: #2d318f; */
  box-shadow: 0 0 12px #2d318f;
  transform: rotate(-77deg);
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
  > div:nth-child(1) {
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
  }

  > div:nth-child(2) {
    color: #666;
    font-size: 16px;
  }

  > div:nth-child(3) {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 12px;
    color: #999;
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
			
				