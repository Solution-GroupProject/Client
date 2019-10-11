let app = new Vue ({
    el: '#app',
    data: {
        someFile: null,
        isHome:true,
        isSuccess:false,
        title:'',
        description:'',
        audioData:''
    },
    methods: {
        sendFile(){
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
                this.isSuccess=true
                
                this.title=''
                this.description=''
                this.readFile()
            })
            .catch(err => {
                alert('gagal')
                console.log(err.response)
            })
        },
        postFile(event){
            this.someFile = event.target.files[0]
        },
        readFile() {
            axios({
                method:'get',
                url:'http://localhost:3000/audio'
            })
            .then(({data})=>{
                console.log('masuk di sini');
                
                console.log(data[0]);
                this.audioData = data
                //tambahan untuk tweet share
                this.audioData.forEach(audio => {
                    audio.tweet = 'https://twitter.com/intent/tweet?text=hello%20world%20' + audio.locationGcp
                });
                //selesai tambahan tweet
                
            })
            .catch(err=>{
              console.log(err);  
            })
        }
    },
    mounted() {
        this.readFile()
    }
})


