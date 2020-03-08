<template>
  <div class="detail">
    <!-- <router-link to="/home" replace>Go to Home</router-link> -->
    <div class="pcq-layout">
      <div style="width:250px;">
        <div class="name text-center">{{item.name}}</div>
        <!-- <div class="exp">
          <span>{{item.exp}}</span>
        </div>-->

        <div class="halo">
          <p>{{this.item.exp}}</p>
          <div></div>
          <!-- <div></div>
          <div></div>-->
        </div>

        <button class="plus1" @click="goRecord()">Level Up!</button>
      </div>
      <div style="background:#fff;flex:1;padding:20px;border-radius:6px;display:flex;">
        <div class="exp-container clearfix">
          <div v-for="(arr,index) in item.items" :key="index" class="exp-container-item">
            <div>{{arr.overview}}</div>
            <div>{{arr.content}}</div>
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
    debugger
    let queryParamsId = this.$router.currentRoute.params["id"];
    this.item = this.$store.state.mockData.list.find(e => e.id == queryParamsId);
    console.log(this.$store);
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
  margin: 0 auto;
  p {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    color: #2d318f;
    z-index: 1000;
    text-shadow: 3px 5px 4px #ccc;
  }
  > div {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    border: 10px solid #2d318f;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: #2d318f;
    box-shadow: inset 0px 0px 2px 0px #2d318f;
    border-radius: 50%;
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
  color: #2d318f;
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
  color: #2d318f;
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
  background: #f1f1f1;
  height: 60px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.plus1 {
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  background: #464aa1;
  color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  border: 1px solid #2d318f;
  transition: all 0.5s;
  &:active {
    background: #353989;
  }
}
</style>
			
				