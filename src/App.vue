<template>
  <router-view />
</template>

<script setup>
</script>

<style>
/* Global styles can stay here if needed */
body {
  margin: 0;
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
