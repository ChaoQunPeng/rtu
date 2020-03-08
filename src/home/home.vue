<template>
  <div class="pcq-layout">
    <div style="width:100%">
      <div class="clearfix line-height-1 mb-4">
        <h1 class="float-left" style="font-size: 36px;">Space</h1>
        <button class="btn-primary float-right" style="font-size:18px" @click="handleModal()">Add</button>
      </div>
      <div class="pcq-grid" style="margin-left: -10px;margin-right: -10px;">
        <div v-for="(item,index) in arr" v-bind:key="index" class="pcq-grid-item">
          <div class="card" @click="goDetail(item)">
            <span class="decor-line"></span>
            <div class="card-content">
              <div class="title">{{item.name}}</div>
              <div class="exp">
                {{item.items.length}}
                <span style="font-size: 12px;color: #666;font-weight: 500;">exp</span>
              </div>
              <div class="date">上次更新：2020-03-06</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="modalIsVisible">
      <div class="modal-shade"></div>
      <div class="modal-body">
        <i class="iconfont icon-delete modal-close" @click="handleModal()"></i>
        <input class="modal-input" type="text" v-model="title" />
        <button class="btn btn-primary float-right" @click="added()">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mockData } from "../mock.data.js";

export default {
  data() {
    return {
      msg: "home working",
      arr: this.$store.state.mockData.list,
      modalIsVisible: false,
      title: ""
    };
  },
  methods: {
    goDetail(item) {
      this.$router.push({ path: `/detail/${item.id}` });
    },
    handleModal() {
      this.modalIsVisible = !this.modalIsVisible;
    },
    added() {
      this.$store.commit("add", {
        title: this.title
      });
      this.modalIsVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.pcq-grid {
  display: flex;
  flex-wrap: wrap;
}

.pcq-grid-item {
  flex: 0 1 25%;
  padding: 10px;
}

.card {
  position: relative;
  height: 120px;
  padding: 20px 15px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #f6f6f8;
  cursor: pointer;
  box-shadow: 0 0 0 #ddd;
  transform: translateY(0);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 3px 4px 4px #ddd;
  }
}

.card-content {
  height: 100%;
  margin-left: 20px;
  padding-left: 5px;

  > .title {
    margin-bottom: 2px;
    font-size: 18px;
    color: #333;
  }

  > .exp {
    font-size: 22px;
    color: #333;
    font-weight: 600;
    margin-bottom: 10px;
  }

  > .date {
    font-size: 14px;
    color: #999;
  }
}

.decor-line {
  position: absolute;
  top: 20px;
  left: 15px;
  width: 4px;
  height: 80px;
  background: #5c87ff;
  border-radius: 4px;
  // border-right: 4px solid #5c87ff;
}

.modal {
  position: fixed;
}

.modal-body {
  position: fixed;
  width: 500px;
  height: auto;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-250px, -150px);
  padding: 30px;
  border-radius: 6px;
}

.modal-shade {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
  opacity: 0.4;
}

.modal-close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
			
				