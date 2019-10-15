(function() {
    window.myVue = new Vue({
        el: "#main", //will think of vue template
        data: {
            title: "My Vue journey of self disrcovery",
            color: "red",
            className: "funky",
            chicken: "Jody",
            famousChickens: [
                // { name: "chicken little" },
                // { name: "funky chicken" },
                // { name: "That chicken in that Chicken Run movie played by" }
            ]
        },
        created: function() {
            console.log("created!");
        },
        mounted: function() {
            console.log("mounted!");
            axios
                .get("/chickens")
                .then(
                    function(resp) {
                        console.log(resp);
                        this.famousChickens = resp.data;
                    }.bind(this)
                )
                .catch(function() {});
        },
        methods: {
            handleClick: function() {
                console.log(this.chicken);
            },
            logChicken: function() {
                console.log(this.chicken);
            }
        }
    });
})();
