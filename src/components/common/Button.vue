<template>
  <button class="btn" :class="'btn-'+type" :style="styleObject" @click="btnClick()">
      <slot></slot>
  </button>
</template>

<script>
export default {
  name: "RButton",
  data() {
    return {
      styleObject: {
        width: this.block ? "100%" : "auto"
      }
    };
  },
  props: {
    type: String,
    block: Boolean
  },
  created() {
    this.$on("click", ev => {
      console.log(ev);
    });
  },
  methods: {
    btnClick() {
      
    }
  }
};
</script>

<style lang="less"  scoped>
@pink: #ff6b81;
@light-blue: #1e90ff;

.btn {
  background: #fff;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;

  &-pink {
    box-shadow: 0 0 0 @pink;
    border: 2px solid @pink;
    color: @pink;

    &:hover {
      box-shadow: 0 0 6px @pink;
      background: @pink;
      color: #fff;
    }
  }

  &-light-blue {
    box-shadow: 0 0 0 @light-blue;
    border: 2px solid @light-blue;
    color: @light-blue;

    &:hover {
      box-shadow: 0 0 6px @light-blue;
      background: @light-blue;
      color: #fff;
    }
  }
}
</style>