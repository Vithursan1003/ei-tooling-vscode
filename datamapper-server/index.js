// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.originalname}`)
//     },
// });
// const upload = multer({ storage });



// app.post('/input/upload', upload.single('file'), (req, res) => {

//         const req.file = req.file;

//         // fs.rename(req.file.path, req.file.path.replace(req.file.originalname, req.body.filename), (err) => {
//         //     if (err) {
//         //       return res.json({error: err.message});
//         //     }  
//         //     fs.readFile(req.file, 'utf8', (err, data) => {
//         //       if (err) throw err;
//         //       console.log(data);
//         //     }); 
//         //     res.json({success: true, message: `File ${req.body.filename} uploaded successfully`});
//         //   });
//         fs.readFile(req.file, 'utf8', (err, data) => {
//           if (err) throw err;
        
//           // Do something with the file contents
//           console.log(data);
//           console.log("File read successfully");
//         });
// });

// app.listen(5000, () => {
//     console.log("server running");
// })

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const mime = require('mime');
const toJsonSchema = require('to-json-schema');
var convert = require('xml-js');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create multer middleware
const upload = multer({ storage: storage });

//JSON to Schema
function JSONtoJSONCHEMA(contents,type, filename){

  const schema = toJsonSchema(contents);
  const schemaString = JSON.stringify(schema, null, 2);
  fs.writeFile(`created/${filename}_schema.json`, schemaString, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(schema);
    console.log('File created successfully!');
  })

 
}

//convert xml to json
function XMLTOJSON(contents,type, filename){
  var xml = contents;
var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
// console.log(result1, '\n', result2);

JSONtoJSONCHEMA(result1,type, filename);
}

// Route for handling file upload and read
app.post('/input/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const fileType = mime.getType(req.file.path);


    XMLTOJSON(data,fileType, req.body.filename);

    fs.rename(req.file.path, req.file.path.replace(req.file.originalname, req.body.filename), (err) => { (err) => {
      if (err) throw err;  
  }});
    res.send('File uploaded and read successfully');
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
