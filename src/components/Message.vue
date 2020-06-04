<template>
  <div class="message">
    <div class="message-content">Message!</div>
  </div>
</template>


<script>
export default {
  name: "Message"
};
</script> 

<style lang="less" scoped>
.message {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s;
  animation-fill-mode: forwards;

  &-content {
    display: inline-block;
    background: #fff;
    padding: 10px 16px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px var(--peace);
  }
}

@keyframes fadeIn {
  0% {
    margin-top: 0;
  }

  100% {
    margin-top: 30px;
  }
}

@keyframes fadeOut {
  0% {
    margin-top: 30px;
  }

  100% {
    margin-top: 0;
  }
}
</style>