<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css"; /*深色主题*/
@import "./assets/css/common.css"; /*公共样式*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bill-form-box {
  .el-card__body {
    overflow: auto;
    height: calc(100% - 50px);
    padding: 15px 15px 20px;
    box-sizing: border-box;
  }
}
</style>
