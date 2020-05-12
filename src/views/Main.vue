<template>
  <div class="page">
    <custom-top-bar :title="$route.meta.title || title" />
    <div class="content">
      <router-view />
    </div>
    <custom-tab-bar :tabBar="tabBar" :selected="selected" />
  </div>
</template>

<script>
import customTopBar from "@/components/customTopBar";
import customTabBar from "@/components/customTabBar";

export default {
  components: { customTabBar, customTopBar },
  computed: {
    tabBar: vm => vm.$store.state.tabBar,
    selected: vm => vm.$store.state.selected,
    title: vm => vm.$store.state.title
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.page {
  margin-bottom: 3.125rem;
  margin-top: 3.125rem;
}
</style>
