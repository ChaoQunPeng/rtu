
<template>
  <div style="height: 100%;">
    <header-layout></header-layout>

    <left-layout></left-layout>
    
    <body-layout>
       <content-layout></content-layout>
    </body-layout>
    
  </div>
</template>

<script>
import HeaderLayout from './default/header.vue';
import LeftLayout from './default/left.vue';
import BodyLayout from './default/body.vue';
import ContentLayout from './default/content.vue';

export default {
  data() {
    return {
      recycleCount: 0
    };
  },
  components: {
    HeaderLayout,
    LeftLayout,
    BodyLayout,
    ContentLayout
  }
};
</script>

<style lang="less" scoped>
@layout-theme: transparent;

body {
  background: @layout-theme;
}
</style>
  
