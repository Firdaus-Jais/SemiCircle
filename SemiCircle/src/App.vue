<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

#app{
  max-height: 80vw;
  width: 100vw;
  background-color: white;
}
</style>

