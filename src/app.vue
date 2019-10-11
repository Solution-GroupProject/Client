<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 mx-auto">
        <imagePicture :pic="pic">

        </imagePicture>
        <podcast :podcast="podcast">

        </podcast>
        <!-- title and desc -->
        <titleDesc :title="title" :desc="desc">

        </titleDesc>

        <!-- input comment -->
        <textarea rows="4" placeholder="Terimakasih sudah berbagi podcast ini" style="padding: 0; margin: 0">
        </textarea>
        <hr>
        <div>
          <h5>Comment:</h5>
        </div>
        <!-- looping comment -->
        <comment>

        </comment>
        <!-- end -->
        <hr>
      </div>
    </div>
  </div>
</template>


<script>
import comment from './components/comment'
import imagePicture from './components/picture'
import titleDesc from './components/titleDesc'
import podcast from './components/podcast'

export default {
  data(){
    return {
      audios: [],
      comments:[],
      pic:'https://picsum.photos/700/300',
      title:'Lorem Ipsum',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      podcast: "./bazzi.mp3"
    }
  },
  methods:{
    getData(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/audio'
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
    }
  },
  components:{
    comment,
    imagePicture,
    titleDesc,
    podcast
  },
  created(){
    // this.getData()
  }
}
</script>

<style>
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



  
</style>