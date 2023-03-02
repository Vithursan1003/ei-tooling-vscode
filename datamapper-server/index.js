const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require ('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,'uploads/');
    },
    filename : (req,file,cb) =>{
        cb(null,`${file.originalname}`)
    },
});
const upload = multer({ storage});

app.post('/input/upload',upload.single('file'),(req,res)=>{
    
    try {
        const file = req.file;
        fs.renameSync(req.file.path,req.file.path.replace(req.file.originalname , req.body.filename));
        res.status(200).json({
            status : 'success',
            message : `${req.body.filename}`
        });
    } catch (error) {
        res.json({
            error
        });
    }
});

app.listen(5000, ()=>{
    console.log("server running");
})