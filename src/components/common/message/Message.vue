<template>
  <div class="message">
    <div class="fadeIn" :class="type">
      <div class="message-content">{{content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      content: "",
      type: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.$el.firstElementChild.classList.replace("fadeIn", "fadeOut");
      this.destroy();
    }, 2000);
  },
  methods: {
    destroy() {
      setTimeout(() => {
        this.$destroy();
        this.$el.remove();
      }, 500);
    }
  }
};
</script> 