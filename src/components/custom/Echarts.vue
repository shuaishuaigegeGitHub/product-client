<template>
  <div :style="{ height: height, width: width }"></div>
</template>

<script>

export default {
  name: 'Echarts',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    options: {
      type: Object,
      default: () => {}
    },
    data: Object
  },
  data() {
    return {
      charts: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadEchart();
    });
  },
  methods: {
    loadEchart() {
      if (this.charts === null) {
        this.charts = this.$echarts.init(this.$el);
        window.addEventListener('resize', this.resize);
      }
      this.charts.setOption(this.options);
      this.charts.setOption(this.data);
    },
    resize() {
      this.charts.resize();
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  watch: {
    data: {
      handler: function(val) {
        if (val && this.charts) {
          this.charts.setOption(val);
        }
      },
      deep: true
    }
  }
}
</script>