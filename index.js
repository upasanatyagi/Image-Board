const express = require("express");
const app = express();
const db = require("./database");

app.use(express.static("./public"));
// const multer = require("multer");
// const uidSafe = require("uid-safe");
// const path = require("path");
//
// const diskStorage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     },
//     filename: function(req, file, callback) {
//         uidSafe(24).then(function(uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     }
// });
//
// const uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152
//     }
// });
// app.post("/uplaod", uploader.single("image"), function(req, res) {
//     //image coming from file data
//     if (req.file) {
//         const { username, desc, title } = req.body;
//         res.sendStatus(200);
//         //itworked
//     } else {
//         //:(
//         res.sendStatus(500);
//     }
// });

app.get("/images", (req, res) => {
    db.getImages().then(result => {
        console.log("--results", result);
        res.json(result.rows);
    });
});

app.listen(8080, () => {
    console.log("i am listening");
});
