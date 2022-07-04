const multer = require('multer');
const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname.replace('utils', ''), 'public', 'images')
const newsPath = rootPath + path.join("/news/");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(newsPath)) {
            fs.mkdir(newsPath, { recursive: true }, (err) => {
                console.log(err);
            });
        }
        callback(null, newsPath);
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/bmp") {
        cb(null, true);
    } else {
        cb("Format error please check", false);
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});


module.exports = upload;