<template>
  <h1>这是一个{{}}</h1>
</template>
<script>
export default {
  mounted() {},
  created() {
    this.projectId = this.$route.params.projectId;
  },
  data() {
    return {
      projectId: ''
    };
  },
  methods: {}
};
</script>