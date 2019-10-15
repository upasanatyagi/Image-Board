(function() {
    new Vue({
        el: "#main", //will think of vue template
        data: {
            images: [],
            username: "",
            desc: "",
            title: "",
            file: "null"
        },
        mounted: function() {
            console.log("mounted!");
            var myVue = this;
            axios
                .get("/images")
                .then(function(resp) {
                    console.log(resp.data);
                    myVue.images = resp.data;
                })
                .catch(function(e) {
                    console.log(e);
                });
        },

        methods: {
            upload: function() {
                console.log(this.username, this.title, this.desc, this.file);
                var fd = new FormData();
                var myVue = this;
                fd.append("image", this.file);
                fd.append("username", this.username);
                fd.append("title", this.title);
                fd.append("desc", this.desc);
                axios
                    .post("/upload", fd)
                    .then(function(res) {
                        myVue.images.unshift(res.data);
                        console.log("this is imagesArr", myVue.images);
                        //unshift the new image into the array
                        myVue.file(res.data.file);
                        myVue.username(res.data.username);
                        myVue.title(res.data.title);
                        myVue.desc(res.data.desc);
                    })
                    .catch(function() {
                        this.error = true;
                    });
            },
            fileSelected: function(e) {
                console.log(e.target.files);
                this.file = e.target.files[0];
            }
        },
        update: function() {
            console.log("update!");
        }
    });
})();
