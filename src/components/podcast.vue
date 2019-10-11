<template>
  <div >
    <audio controls style="margin: 0; padding: 0;">
      <source :src="podcast" type="audio/ogg">
    </audio>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['podcast']
}
</script>

<style>

</style>