<template>
  <div class="col-8">
    <div class="row" style="justify-content: center;">
      <div v-for="audio in audioData" :key="audio._id" :id="audio._id" class="music-player col-5">
        <img class="album-cover"
          :src="audio.picture">
        <div class="control-panel">
          <audio controls>
            <source :src="audio.locationGcp">
            Your browser does not support the audio element.
          </audio>
          <div class="song-info" style="display:flex; flex-direction:column; justify-content:center; align-item:center">
            <h3>{{ audio.title }}</h3>
            <p class="title">{{ audio.description }}</p>
          </div>
          <div>
            <a href="#" class="btn btn-light" @click="emitToParrent(audio)">Comment</a>
            <a class="btn btn-light" target="_blank" rel="canonical" :href="audio.tweet" data-size="large">
            <img src="https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png"
              style="height: 20px; width:20px;" alt="">
            Tweet</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['audioData', 'isHome'],
  data(){
    return{
      comment: ''
    }
  },
  methods:{
    emitToParrent(audio){
      this.$emit('triggerComment', audio)
    }
  }
}
</script>

<style>

</style>