const spicedPg = require("spiced-pg");

const db = spicedPg(`postgres:postgres:postgres@localhost:5432/imageboard`);
module.exports.getImages = () => {
    return db.query(
        `SELECT * FROM images
        ORDER BY id DESC;`
    );
};
module.exports.addImage = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url,username,title,description) VALUES($1, $2, $3 ,$4)
        RETURNING id`,
        [url, username, title, description]
    );
};
module.exports.getImageInfo = id => {
    return db.query(`SELECT * FROM images WHERE id=$1`, [id]);
};

module.exports.postComment = (user_comment, comment, imageId) => {
    return db.query(
        `INSERT INTO comments(user_comment,comment,imageId) VALUES($1,$2,$3)
        RETURNING *`,
        [user_comment, comment, imageId]
    );
};

module.exports.allcomments = imageId => {
    return db.query(
        `SELECT * FROM comments WHERE imageId=$1
        `,
        [imageId]
    );
};
