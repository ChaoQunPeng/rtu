<template>
  <button class="btn" :class="'btn-'+type" :style="styleObject" @click="click()">
    <!-- slot中间的是默认值 -->
    <slot>确认</slot>
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

  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less"  scoped>
.btn {
  display: inline-block;
  outline: none;
  border-radius: 4px;
  padding: 0 20px;
  line-height: 2.5;
  height: 34px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.85;
  }

  &-primary {
    background: var(--clear-chill);
    border: 1px solid var(--clear-chill);
    color: #fff;

    &-ghost {
      background: transparent;
    }
  }

  &-danger {
    background: var(--watermelon);
    border: 1px solid var(--watermelon);
    color: #fff;
  }

  &-default {
    background: var(--bay-wharf);
     border: 1px solid var(--bay-wharf);
     color: #fff;
  }
}
</style>