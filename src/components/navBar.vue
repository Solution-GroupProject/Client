<template>
  <nav class="navbar navbar-light sticky-top" style="background-color: rgba(45, 52, 54,0.5);">
    <a class="navbar-brand" href="#" @click="home"><img :src="logo" alt=""></a>
  </nav>
</template>

<script>
export default {
  props:['logo'],
  methods:{
    home(){
      this.$emit('toHome')
    }
  }
}
</script>

<style>

</style>