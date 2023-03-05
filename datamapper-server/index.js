const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const mime = require('mime');
const toJsonSchema = require('to-json-schema');
var convert = require('xml-js');
const path = require('path')
const csvtojson = require('csvtojson');


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
function JSONtoJSONCHEMA(contents, filename) {
  const schema = toJsonSchema(contents);
  console.log(schema);
  CREATENEWFILE(schema, filename);
}

//convert xml to json
function XMLTOJSON(contents, filename) {
  var xml = contents;
  var result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
  JSONtoJSONCHEMA(result1, filename);
}

//convert xsd to jsonschema
function XSDTOJSONSchema(data, filename) {
  const XML_SCHEMA = data;
  const Xsd2JsonSchema = require('xsd2jsonschema').Xsd2JsonSchema;
  const xs2js = new Xsd2JsonSchema();
  const convertedSchemas = xs2js.processAllSchemas({
    schemas: { 'hello_world.xsd': XML_SCHEMA }
  });
  const jsonSchema = convertedSchemas['hello_world.xsd'].getJsonSchema();
  CREATENEWFILE(jsonSchema, filename);
}

//convert csv to json
async function CSVTOJSON(contents, filename) {
  const csvFilePath=contents
  const csv=require('csvtojson')
  csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
      JSONtoJSONCHEMA(jsonObj, filename);
  })
   
  // Async / await usage
  const jsonArray=await csv().fromFile(csvFilePath);
}

//create JSON schema file
function CREATENEWFILE(contents, filename) {
  const schemaString = JSON.stringify(contents, null, 2);
  fs.writeFile(`created/${filename}_schema.json`, schemaString, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File created successfully!');
  })
}

// Route for handling file upload and read
app.post('/input/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const fileExtension = path.extname(req.file.path);
    console.log(fileExtension);

    switch (fileExtension) {
      case '.xml':
        XMLTOJSON(data, req.body.filename);
        break;
      case '.json':
        JSONtoJSONCHEMA(data, req.body.filename);
        break;
      case '.xsd':
        XSDTOJSONSchema(data, req.body.filename);
        break;
      case '.csv':
        CSVTOJSON(filePath, req.body.filename);
        break;
    }
    // fs.rename(`uploads/${req.file.originalname}`, `uploads/${req.body.filename}`, (err) => {
    //   if (err) throw err;
  
    //   //console.log(`File renamed to ${newFileName}`);
    // });
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
