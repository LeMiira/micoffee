<template>
  <router-view />
</template>

<script setup>
</script>

<style>
/* Global styles can stay here if needed */
html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fancy-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.fancy-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.3); 
  border-radius: 10px;
}
.fancy-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(168, 144, 131, 0.3); 
  border-radius: 10px;
}
.fancy-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 144, 131, 0.6); 
}
</style>
