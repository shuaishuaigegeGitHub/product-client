<template>
  <div class="fin-card__wrapper" v-if="visible" @click="handleClose" data-v-step="7">
    <div class="fin-card" :style="{ width: width }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinCard',
  props: {
    visible: Boolean,
    width: {
      type: String,
      default: '50%'
    }
  },
  methods: {
    handleClose(e) {
      if (e.target === this.$el) {
        this.$emit('update:visible', false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fin-card__wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #00000066;

  .fin-card {
    margin: 10vh auto 0;
    padding: 10px;
  }
}
</style>