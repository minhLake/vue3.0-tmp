<template>
  <div class="tabbar flex-c" :style="{ backgroundColor: tabBar.backgroundColor }">
    <template v-for="(item,index) in tabBar.list">
      <div
        :key="index"
        class="flex-1 c-flex-a btn"
        @click="tabBarChangeHandle(item.pagePath, index)"
      >
        <img class="icon" :src="item.iconPath" v-if="selected !== index" alt />
        <img class="icon" :src="item.selectedIconPath" v-else alt />
        <p :style="{ color: tabBar.color }" v-if="selected !== index">{{ item.text }}</p>
        <p :style="{ color: tabBar.selectedColor }" v-else>{{ item.text }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    tabBar: Object,
    selected: Number
  },
  mounted() {},
  methods: {
    ...mapMutations(["selectedChangeHandle"]),
    tabBarChangeHandle(path, selected) {
      // this.$router.push({ path });
      this.selectedChangeHandle({ selected });
    }
  }
};
</script>

<style lang="less" scoped>
.icon {
  height: 1.5rem;
  width: 1.5rem;
}
p {
  font-size: 0.75rem;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 3.125rem;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  overflow: hidden;
}
.btn {
  height: 100%;
}
.btn:active {
  background-color: #f0f0f0;
}
</style>