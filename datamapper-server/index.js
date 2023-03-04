const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    },
});
const upload = multer({ storage });

app.post('/input/upload', upload.single('file'), (req, res) => {

        fs.rename(req.file.path, req.file.path.replace(req.file.originalname, req.body.filename), (err) => {
            if (err) {
              return res.json({error: err.message});
            }
            res.json({success: true, message: `File ${req.body.filename} uploaded successfully`});
          });
    
});

app.listen(5000, () => {
    console.log("server running");
})