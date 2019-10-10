let app = new Vue ({
    el: '#app',
    data: {
        someFile: null,
        isHome:true
    },
    methods: {
        sendFile(){
            let bodyFromData = new FormData()
            bodyFromData.set('audio', this.someFile)
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
                console.log(response)
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        postFile(event){
            this.someFile = event.target.files[0]
        }
    }
})