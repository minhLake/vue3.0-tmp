<template>
  <div class="topbar flex-b">
    <div>
      <Button icon="back" class="btn" @click="$router.back()" v-if="historyStatus"></Button>
    </div>
    <p>{{ title }}</p>
    <div>
      <Button icon="more" class="btn"></Button>
    </div>
  </div>
</template>

<script>
import { Button } from "mint-ui";

export default {
  components: { Button },
  computed: {
    historyStatus: () => window.history.length > 2
  },
  props: {
    title: String
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.topbar {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.125rem;
  overflow: hidden;
  width: 100%;
  z-index: 999;
  padding: 0 0.75rem;
  box-sizing: border-box;
}
.btn {
  background-color: #fff;
  border-color: #fff;
  box-shadow: 0 0 1px #fff;
}
p {
  font-size: 0.875rem;
  color: #000;
}
</style>