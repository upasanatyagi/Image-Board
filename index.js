const express = require("express");
const app = express();
const s3 = require("./s3");
const db = require("./database");
const { s3Url } = require("./config");

app.use(express.static("./public"));
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(express.json());

app.get("/images", (req, res) => {
    db.getImages().then(result => {
        console.log("--results", result);
        res.json(result.rows);
    });
});

app.get("/images/:id", (req, res) => {
    console.log("req.params.id", req.params.id);
    db.getImageInfo(req.params.id)
        .then(function({ rows }) {
            console.log("rowsmodal", rows[0]);
            res.json(rows[0]);
        })
        .catch(function(e) {
            console.log(e);
        });
});
app.post("/upload", uploader.single("image"), s3.upload, function(req, res) {
    //image coming from file data
    const { username, title, desc } = req.body;
    const url = `${s3Url}${req.file.filename}`; //url on aws
    db.addImage(url, username, title, desc)
        .then(function({ rows }) {
            res.json({
                username,
                title,
                desc,
                url,
                id: rows[0].id
            });
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});
app.post("/comment", function(req, res) {
    const { user_comment, comment, imageId } = req.body;
    db.postComment(user_comment, comment, imageId)
        .then(function(rows) {
            console.log("----rows", rows);
            res.json({ rows });
        })
        .catch(function(e) {
            console.log(e);
        });
});
app.get("/comment", function(req, res) {
    let { id } = req.query;
    db.allcomments(id).then(rows => {
        res.json(rows);
        console.log("rows", rows);
    });
});
//     if (req.file) {
//         const { username, desc, title } = req.body;
//         res.sendStatus(200);
//         console.log("username: ", username, " desc:", desc, " title: ", title);
//         //itworked
//     } else {
//         //:(
//         res.sendStatus(500);
//     }
// });

app.listen(8080, () => {
    console.log("i am listening");
});
