<template>
  <div>
    <custom-top-bar :title="$route.meta.title || title"/>
    <div class="content">
      <router-view /> 
    </div>
  </div>
</template>

<script>
import customTopBar from "@/components/customTopBar";

export default {
  components: { customTopBar },
  computed: {
    title: vm => vm.$store.state.title,
  },
};
</script>
