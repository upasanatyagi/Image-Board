const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/chickens", (req, res) => {
    res.json([
        { name: "chicken little" },
        { name: "funky chicken" },
        { name: "That chicken in that Chicken Run movie played by" }
    ]);
});
app.listen(8080, () => {
    console.log("i am listening");
});
