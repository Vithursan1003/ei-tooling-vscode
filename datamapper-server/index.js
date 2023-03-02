const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest : 'uploads/'});

app.post('/input/upload',upload.single('file'),(req,res)=>{
    const file = req.file;
    res.send('file uploaded successfully');
});

app.listen(5000, ()=>{
    console.log("server running");
})