<script setup>

import ToastList from './pages/components/ToastList.vue';
import Footer from './pages/components/Footer.vue';
import LightDarkModeSwitch from './pages/components/LightDarkModeSwitch.vue';
//Editor
import JSONFormatter from './pages/JSONFormatter.vue';
//Help Icon
import help_icon from './assets/icons/help_icon.vue';
import SVGIconButton from './pages/components/SVGIconButton.vue';

const openDoc = () => {
  window.open('https://www.linkedin.com/pulse/how-debug-omniscript-runtime-mode-rohitkumar-asare-im9sf', '_blank');
}

</script>

<template>
  <ToastList />
  <!-- <LightDarkModeSwitch /> -->
  <SVGIconButton @click="openDoc" :icon="help_icon" :isSquare="false" color="green"
    class="!p-0.5 absolute top-3 right-3" title="Learn How to Debug OmniScript" />
  <JSONFormatter />

  <Footer />
</template>

<style scoped></style>
