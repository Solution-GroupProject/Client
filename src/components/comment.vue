<template>
  <div >
    <div v-for="(comment, index) in comments" :key="index">
      <hr>
      <div class="comment">
        <p>
          {{ comment }}
        </p>
      </div>
  </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      comment: ''
    }
  },
  methods:{
    
  },
  props:['comments']
}
</script>

<style>

</style>