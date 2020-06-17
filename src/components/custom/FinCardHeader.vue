<template>
  <div class="card-header">
    <span class="title">{{ title }}</span>
    <span class="title">
      <slot name="title"></slot>
    </span>
    <div class="operate">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  padding-bottom: 20px;
  display: flex;

  .title {
    display: inline-block;
    font-weight: bold;
    line-height: 28px;
  }

  .operate {
    flex-grow: 1;
    text-align: right;
  }
}
</style>