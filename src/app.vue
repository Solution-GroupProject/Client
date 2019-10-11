<template>

<div>
  <navBar :logo="logo" @toHome="backHome"></navBar>
  <div class="container-fluid">
    <!-- <div class="container"> -->
    <div v-show="isHome" class="row">
      <div class="col-4">
        <!-- <form action="">
                <input type="file" name="" id="" v-on:change="postFile($event)" accept=".mp3,audio/*"> 
                <button type="submit" @click.prevent="sendFile()" >submit</button>
              </form> -->
        <!-- form baru -->
        <!-- @receiveData="onReceiveData" -->
        <formAudio @receiveData="onReceiveData" :audioData="audioData" :readFileCoba="readFile" @triggerLoading="loading"></formAudio>
        <!-- end of form -->
      </div>
      <!-- podcast list -->
      <podcastList :audioData="audioData" :isHome="isHome" @triggerComment="createForm"></podcastList>
      <!-- end of podcast list -->
    </div>
    <!-- end of div row -->
    <!-- </div>   -->
  </div>
<!-- Detail Page -->
  <div v-show="!isHome" class="container">
    <div class="row">
      <div class="col-sm-10 mx-auto bg-color">
        <imagePicture :pic="pic"></imagePicture>
        <podcast :podcast="podcast"></podcast>
        <!-- title and desc -->
        <titleDesc :title="title" :desc="desc"></titleDesc>
        <!-- input comment -->
        <form action="">
          <textarea rows="4" placeholder="Terimakasih sudah berbagi podcast ini" style="padding: 0; margin: 0" v-model="comment" required></textarea>
          <button @click="addComment()"> Comment </button>
        </form>
        <hr>
        <div>
          <h5>Comment:</h5>
        </div>
        <!-- looping comment -->
        <comment :comments="comments"></comment>
        <!-- end -->
        <hr>
        <button @click="backHome()">Home</button>
      </div>
    </div>
  </div>
  <div v-if="isLoading" id="loader"></div>
</div>

</template>


<script>
import comment from './components/comment'
import imagePicture from './components/picture'
import titleDesc from './components/titleDesc'
import podcast from './components/podcast'
import formAudio from './components/form'
import podcastList from './components/podcastList'
import navBar from './components/navBar'
import mpvalue from './bazzi.mp3'
import srcLogo from '../logo.png'

export default {
  data(){
    return {
      activeId: '',
      comments:[],
      comment: '',
      pic:'https://picsum.photos/700/300',
      title:'',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      podcast: mpvalue,
      isHome:true,
      audioData:'',
      logo: srcLogo,
      isLoading : false
    }
  },
  methods:{
    loading(data){
      this.isLoading = data
    },
    backHome(){
      this.isHome = true
      this.activeId = ''
      this.comment = ''
    },
    addComment(){
      console.log(this.activeId, '=========');
      console.log(this.comment);
      const _id = this.activeId
      const comment = this.comment
      axios({
        method: 'patch',
        url: 'http://solution-server.indraaditya.online/audio',
        data:{
          _id,
          comment
        }
      })
        .then(({ data })=>{
          this.comment = ''
          this.comments.push(data.addedComment)
        })
    },
    createForm(data){
      this.activeId = data._id
      this.isHome = false
      this.comments = data.comment
      this.title = data.title
      this.desc = data.description
    },
    onReceiveData(data){
      console.log(data);
      
      console.log(123);
      
      this.readFile()
    },
    getData(){
      axios({
        method: 'get',
        url: 'http://solution-server.indraaditya.online/audio'
      })
        .then(({audios})=>{
          this.audios = audios;
          audios.forEach(audio=>{
            this.comments.push(audio.comments)
          })
        })
        .catch(err=>{
          console.log(err);
        })
    },
    readFile() {
      console.log('test');
      
        axios({
            method:'get',
            url:'http://solution-server.indraaditya.online/audio'
        })
        .then(({data})=>{
          console.log('masuk di sini');
          
          // console.log(data[0]);
          this.audioData = data
          //tambahan untuk tweet share
          this.audioData.forEach((audio, i) => {
            const random = Math.floor(Math.random() * 100)
            audio.tweet = 'https://twitter.com/intent/tweet?text=hello%20world%20' + audio.locationGcp
            audio.picture = `https://picsum.photos/id/${i + random}/550/300`
          });
          //selesai tambahan tweet
            
        })
        .catch(err=>{
          console.log(err);  
        })
    }
  },
  components:{
    comment,
    imagePicture,
    titleDesc,
    podcast,
    formAudio,
    podcastList,
    navBar
  },
  created(){
    // this.getData()
  },
  mounted() {
    this.readFile()
  }
}
</script>

<style>
  .bg-color{
   background-color: rgba(223, 230, 233,0.8);
   padding: 2vh 8vw; 
  }
  .pics{
    text-align: center;
    margin: 20px;
  }

  .aqua{
    background-color: aqua
  }

  audio{
    width: 100%;
    margin: 20px
  }

  textarea{
    width: 100%;
    margin: 20px
  }

  .comment{
    display: flex;
    justify-content:space-between;
    width: 90%;
    margin: 0 auto
  }

  #loader {
  animation: animate 1.5s linear infinite;
  clip: rect(0, 80px, 80px, 40px); 
  height: 80px;
  width: 80px;
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
}
@keyframes animate {
  0% { 
    transform: rotate(0deg)
  }
  100% { 
    transform: rotate(220deg)
  }
}
#loader:after {
  animation: animate2 1.5s ease-in-out infinite;
  clip: rect(0, 80px, 80px, 40px);
  content:'';
  border-radius: 50%; 
  height: 80px;
  width: 80px;
  position: absolute; 
} 
@keyframes animate2 {
  0% {
    box-shadow: inset #fff 0 0 0 17px;
    transform: rotate(-140deg);
  }
  50% {
    box-shadow: inset red 0 0 0 2px;
  }
  100% {
    box-shadow: inset red 0 0 0 17px;
    transform: rotate(140deg);
  }
}
</style>