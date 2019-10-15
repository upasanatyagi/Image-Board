(function() {
    new Vue({
        el: "#main", //will think of vue template
        data: {
            // title: "images",
            images: []
            // username: "",
            // desc: "",
            // title: "",
            // file: "null"
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
        // method: {
        //     upload: function() {
        //         console.log(this.username, this.title, this.desc, this.file);
        //         var fd = new FormData();
        //         fd.append("image", this.file);
        //         fd.append("username", this.username);
        //         fd.append("title", this.title);
        //         fd.append("desc", this.desc);
        //         axios.post("/uplaod", fd).then(function(res) {});
        //
        //         // axios.post("/some-route", {
        //         //     username: username,
        //         //     title: title
        //         // });
        // },
        // fileSelected: function(e) {
        //     console.log(e.target.files);
        //     this.file = e.target.files[0];
        // }
        // },
        update: function() {
            console.log("update!");
        }
    });
})();
