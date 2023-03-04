const express = require('express');
const toJsonSchema = require('to-json-schema');
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

// app.post('/createFile', (req, res) => {
//     const data = req.body.filecontent;
//     const name = req.body.filename;
//     fs.writeFile(`${name}.json`, data, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send({ error: 'failed to create file' });
//         } else {
//             res.send({ message: 'file created successfully' });
//         }
//     });
// });


app.post('/input/upload', upload.single('file'), (req, res) => {

    try {
        const file = req.file;
        //fs.renameSync(req.file.path, req.file.path.replace(req.file.originalname, req.body.filename));

        fs.readFile(`uploads/${req.file.filename}`, (err, buff) => {
            if (err) {
                console.error(err);
                return;
            }
            const fileContent = buff.toString();
            const jsonObj = JSON.parse(fileContent);
            const schema = toJsonSchema(jsonObj);

            const schemaJson = JSON.stringify(schema)
            fs.writeFile(`created/${req.body.filename}_schema.json`, schemaJson, (err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log("success");
                }
            });
        })

        try {
            fs.unlinkSync(`uploads/${req.file.filename}`);
            console.log("Delete File successfully.");
        } catch (error) {
            console.log(error);
            return;
        }

        res.status(200).json({
            status: 'success',
            message: `JSON schema created successfully`
        });

    } catch (error) {
        res.json({
            error
        });
    }
});

app.listen(5000, () => {
    console.log("server running");
})