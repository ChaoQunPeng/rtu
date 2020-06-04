<template>
  <div class="notice">
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notice',
    data () {
      return {
        visible: false,
        content: 'Notice Component',
        duration: 30000
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close() // 3000ms之后调用关闭方法
        }, this.duration)
      },
      close() {
        this.visible = false
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }, 3500)
      }
    },
    mounted() {
      this.setTimer() // 挂载的时候就开始计时，3000ms后消失
    }
  }
</script>