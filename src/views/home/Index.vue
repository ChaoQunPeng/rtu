<template>
  <div>
    <div class="home-header">
      <!-- <button class="button" @click="handleModal()">Add</button> -->
      <r-button type="danger" @click.native="handleModal()">Add</r-button>
    </div>
    <div class="pcq-grid">
      <div class="pcq-grid-item" v-for="(item,index) in list" :key="index">
        <div class="skill-card" @click="goDetail(item)">
          <span class="descr-line"></span>
          <div class="name">{{item.Name}}</div>
          <div class="level">
            {{getPhaseInfo(item.TotalExp).name}}
            {{getPhaseInfo(item.TotalExp).level}}
          </div>
          <div class="exp">
            <div class="progress">
              <div
                class="progress-bar"
                :style="getProgressLength(item.TotalExp,getPhaseInfo(item.TotalExp))"
              >
                <span
                  class="progress-text"
                >{{item.TotalExp || 0}}/{{getPhaseInfo(item.TotalExp).baseExp}}exp</span>
              </div>
              <span
                class="progress-text"
              >{{item.TotalExp || 0}}/{{getPhaseInfo(item.TotalExp).baseExp}}exp</span>
            </div>
          </div>
          <div class="skill-card-handle">
            <i class="iconfont icon-ellipsis-vertical"></i>
            <ul>
              <li @click.stop="updateCard(item)">编辑</li>
              <li @click.stop="deleteCard(item)">删除</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- <message></message> -->

    <modal title="Add Skill" :visible="modalIsVisible" @close="handleModal" @ok="addedCard">
      <input class="modal-input" type="text" v-model="title" />
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import RButton from "../../components/Button.vue";
import Modal from "../../components/Modal.vue";
import Message from '../../components/Message.vue';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      msg: "home working",
      list: [],
      title: "",
      modalIsVisible: false,
      editor: ClassicEditor
    };
  },
  components: {
    RButton,
    Modal,
    Message
  },
  created() {
    this.getList();
},
  methods: {
    getList() {
      axios.get("skill").then(res => {
        this.list = res.data.data;
      });
    },
    goDetail(item) {
      this.$router.push({
        path: `/detail/${item.SkillID}`,
        query: {
          skillName: item.Name
        }
      });
    },
    handleModal(e) {
      this.modalIsVisible = !this.modalIsVisible;
    },
    addedCard() {
      axios
        .post(`skill`, {
          Name: this.title
        })
        .then(
          res => {
            this.$message(`新增成功！`);
            axios.get("skill").then(res => {
              this.list = res.data.data;
              this.modalIsVisible = false;
              this.title = "";
            });
          },
          err => {
            this.$message(`新增失败！`);
          }
        );
    },
    updateCard(item) {
      const value = prompt(`您要把${item.Name}修改成：`, item.Name);
      if (value) {
        axios
          .put(`skill/${item.SkillID}`, {
            Name: value
          })
          .then(
            res => {
              this.getList();
            },
            err => {
              this.$message(`修改失败`);
            }
          );
      }
    },
    deleteCard(item) {
      if(item.TotalExp>0) {
        this.$message("该技能下存在经验，不能删哦~");
        return;
      }
      const value = confirm(`您确定要删除${item.Name}吗？`);
      if (value) {
        axios.delete(`skill/${item.SkillID}`).then(res => {
          if (res) {
            this.$message(`删除成功`);
            this.getList();
          }
        });
      }
    },
    getPhaseInfo(totalExp) {
      if (totalExp >= 0 && totalExp <= 1000) {
        const expRange = [
          [0, 199],
          [200, 399],
          [400, 599],
          [600, 799],
          [800, 999]
        ];
        return this.getLevelInfo(totalExp, expRange, "新手", 199);
      } else if (totalExp > 1000 && totalExp <= 3000) {
        const expRange = [
          [1000, 1399],
          [1400, 1799],
          [1800, 2199],
          [2200, 2599],
          [2600, 2999]
        ];
        return this.getLevelInfo(totalExp, expRange, "高级新手", 399);
      } else if (totalExp > 3000 && totalExp <= 6000) {
        const expRange = [
          [3000, 3599],
          [3600, 4199],
          [4200, 4799],
          [4800, 5399],
          [5400, 5999]
        ];
        return this.getLevelInfo(totalExp, expRange, "胜任者", 599);
      } else if (totalExp > 6000 && totalExp <= 10000) {
        const expRange = [
          [6000, 6799],
          [6800, 7599],
          [7600, 8399],
          [8400, 9199],
          [9200, 9999]
        ];
        return this.getLevelInfo(totalExp, expRange, "精通者", 799);
      } else {
        return { name: "专家", level: "" };
      }
    },
    getLevelInfo(totalExp, expRange, levelName, levelExp) {
      const data = {
        name: levelName,
        level: 0,
        baseExp: levelExp,
        range: []
      };
      for (let i = 0; i < expRange.length; i++) {
        if (totalExp >= expRange[i][0] && totalExp <= expRange[i][1]) {
          switch (i) {
            case 0:
              data.level = "I";
              break;
            case 1:
              data.level = "II";
              break;
            case 2:
              data.level = "III";
              break;
            case 3:
              data.level = "IV";
              break;
            case 4:
              data.level = "V";
              break;
          }
          data.range = expRange[i];
        }
      }
      return data;
    },
    getProgressLength(totalExp, levelData) {
      // totalExp 可能为null,即0
      // [0,199]  (2-0) / 199
      // [6000, 6799] (6500-6000) / 799
      // let width = Number(totalExp) / Number(levelData.range[1]); // 这是总的经验条
      let width = (totalExp - levelData.range[0]) / levelData.baseExp; // 这是每个等级的基础经验条
      return { width: width * 100 + "%" };
    }
  }
};
</script>

<style lang="less" scoped>
.pcq-grid {
  display: flex;
  flex-wrap: wrap;
  &-item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.skill-card {
  position: relative;
  background: #fff;
  width: 100%;
  margin: 15px;
  padding: 20px 30px 20px 40px;
  border-radius: 4px;
  border: 1px solid #f1f1f1;
  cursor: pointer;
  box-shadow: 0 0 0 #ddd;
  transform: translateY(0);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 6px 6px 10px #ddd;
    z-index: 10;
  }

  &-handle {
    position: absolute;
    right: 6px;
    top: 10px;
    color: #999;
    &:hover {
      > ul {
        display: block;

        > li {
          padding: 8px 8px;
          border-bottom: 1px solid #ddd;
          &:last-child {
            border-bottom: none;
          }

          &:hover {
            background: #ddd;
          }
        }
      }
    }

    > ul {
      display: none;
      position: absolute;
      list-style: none;
      width: 120px;
      background: #fff;
      border: 1px solid #f1f1f1;
      box-shadow: 2px 2px 30px #ddd;
    }
  }

  .name {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .level {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .exp {
    font-size: 18px;
    color: #666;

    > span {
      font-size: 12px;
    }
  }

  .descr-line {
    position: absolute;
    width: 4px;
    height: 90px;
    background: #1e90ff;
    border-radius: 2px;
    left: 12px;
    top: 14px;
  }
}

.home-header {
  height: 80px;
  font-size: 30px;
  line-height: 80px;
  padding-left: 20px;
}

.button {
  --color: #ff6b81;
  background: #fff;
  display: inline-block;
  color: var(--color);
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  border: 2px solid var(--color);
  cursor: pointer;
  box-shadow: 0 0 0 var(--color);
  transition: all 0.3s;
  &:hover {
    background: var(--color);
    box-shadow: 0 0 5px var(--color);
    color: #fff;
  }
}

.progress {
  position: relative;
  display: block;
  width: 240px;
  height: 20px;
  box-sizing: content-box;
  background: #d5d5d5;
  border-radius: 2px;
  font-size: 12px;
  &-bar {
    background: #2097ef;
    color: #fff;
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 2px;
    position: absolute;
    z-index: 10;
  }

  &-text {
    position: absolute;
    transform: translate(-50%, 0);
    left: 130px;
    top: 5px;
  }
}
</style>