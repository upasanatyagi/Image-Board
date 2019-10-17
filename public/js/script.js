(function() {
    Vue.component("image-component", {
        template: "#template",
        data: function() {
            return {
                name: "upasana",
                // count: 0,
                image: {},
                username: "",
                description: "",
                url: "",
                title: "",
                comments: [],
                created_at: "",
                user_comment: "",
                comment: ""
            };
        },
        props: ["postTitle", "selectedImage"],
        mounted: function() {
            //make an axios to get the information about that
            // var myVue = this;
            // console.log(myVue);
            axios
                .get(`/images/${this.selectedImage}`)
                .then(
                    function(resp) {
                        // console.log("resp", resp.data);
                        this.image = resp.data;
                        // console.log("this.images:", res);
                    }.bind(this)
                )
                .catch(function(e) {
                    console.log(e);
                });
            axios
                .get(`/comment?id=${this.selectedImage}`)
                .then(
                    function(result) {
                        this.comments = result.data.rows;
                        console.log("this.comments", this.comments);
                    }.bind(this)
                )
                .catch(function(e) {
                    console.log("comments error", e);
                });
        },
        // watch:{
        //     id:function(){
        //         console.log("i ma the watcher and id just changed");
        //repeating the above code/get
        //     }
        // },
        methods: {
            closeModal: function() {
                // console.log("emitthing from the component...");
                this.$emit("close");
            },
            submit: function() {
                var myVue = this;
                let commentinfo = {
                    imageId: this.selectedImage,
                    user_comment: this.user_comment,
                    comment: this.comment
                };
                axios.post("/comment", commentinfo).then(function({ data }) {
                    console.log("resp:", data);
                    myVue.comments.unshift(data[0]);
                });
            }
        }
    });

    new Vue({
        el: "#main", //will think of vue template
        data: {
            images: [],
            count: null,
            username: "",
            desc: "",
            title: "",
            file: null,
            selectedImage: null
            // imageId:location.hash.slice(1);
        },
        mounted: function() {
            var myVue = this;
            axios
                .get("/images")
                .then(function(resp) {
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
            },
            closeMe: function() {
                this.selectedImage = null;
                // console.log("closeMe is running...");
                // console.log("count is:", count);
            }
        },
        update: function() {
            console.log("update!");
        }
    });
})();

// addEventListener('hashchange',function(){
//     self.imageId = location.hash.slice(1);
//     console.log('hash change event fired');
// });
//use the code in close mobel
//this.imageId = null;
//history.replaceState(null,null,'');
