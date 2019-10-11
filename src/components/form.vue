<template>
  <div>
    <form @submit.prevent="sendFile()">
      <h1><strong>Share your stories with us</strong></h1>
      <div v-show="isSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>successfully uploaded</strong> Hope you find the best solution
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" name="title" id="title" class="form-controll" required/>
      </div>
      <div class="form-group">
        <label for="caption">Description</label>
        <input v-model="description" type="text" name="caption" id="caption" class="form-controll" required/>
      </div>

      <div class="form-group file-area">
        <label for="images">Audio</label>
        <input type="file" name="images" id="images" required="required" multiple="multiple"
          v-on:change="postFile($event)" accept=".mp3,audio/*" />
        <div class="file-dummy">
          <div class="success">Great, your files are selected. Keep on.</div>
          <div class="default">Please select some files</div>
        </div>
      </div>

      <div class="form-group">
        <input class="btn btn-dark" type="submit" value="Upload">
        <!-- <button type="submit">Upload audio</button> -->
      </div>

    </form>
    
    <link href='https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500,600,700' rel='stylesheet'
      type='text/css'>
  </div>
</template>

<script>
export default {
  data(){
    return{
      someFile: null,
      title:'',
      description:'',
      isSuccess : false
    }
  },
  methods:{
    sendFile(){
      this.$emit('triggerLoading', true)
      this.isLoading = true 
      let bodyFromData = new FormData()
      bodyFromData.set('audio', this.someFile)
      bodyFromData.append('title',this.title)
      bodyFromData.append('description',this.description)
      axios({
          method: 'post',
          url : 'http://localhost:3000/audio',
          data: bodyFromData,
          files: {
              audio: this.someFile
          },
          config : {
              headers : {
                  'Content-Type' : 'multipart/form-data'
              }
          }
      })
      .then(response => {
        this.$emit('triggerLoading', false)
        this.isSuccess=true
        
        this.title=''
        this.description=''
        this.$emit('receiveData')
      })
      .catch(err => {
        swal('Error', "File is too large", "error");
        this.$emit('triggerLoading', false)
        console.log(err.response)
      })
    },
    postFile(event){
        this.someFile = event.target.files[0]
    }
  },
  porps:['audioData']
}
</script>

<style>

</style>