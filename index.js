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

app.get("/images", (req, res) => {
    db.getImages().then(result => {
        console.log("--results", result);
        res.json(result.rows);
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
