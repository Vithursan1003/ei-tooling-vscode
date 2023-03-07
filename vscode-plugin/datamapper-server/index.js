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


app.post('/input/upload', upload.single('file'), (req, res) => {

    try {
        const file = req.file;
        fs.renameSync(req.file.path, req.file.path.replace(req.file.originalname, req.body.filename));

        fs.readFile(`uploads/${req.body.filename}`, (err, buff) => {
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

                    try {
                        // Get the active workspace folder;

                        const workspacePath =
                            console.log(workspacePath);

                        // Construct the file path in the workspace folder
                        const fileName = `${req.body.filename}_schema.json`;

                        // Write the file to disk
                        fs.promises.writeFile(workspacePath, "fileContent");
                    } catch (err) {
                        console.error(`Failed to upload file: ${err}`);
                    }

                    // try {
                    //     // Get the active workspace folder
                    //     const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                    //     if (!workspaceFolder) {
                    //         throw new Error('No workspace folder found');
                    //     }

                    //     // Construct the file path in the workspace folder
                    //     const fileName = `${req.body.filename}_schema.json`;
                    //     const filePath = path.join(workspaceFolder.uri.fsPath, fileName);

                    //     // Write the file to disk
                    //     fs.promises.writeFile(filePath, "fileContent");
                    // } catch (err) {
                    //     console.error(`Failed to upload file: ${err}`);
                    // }

                    try {
                        fs.unlinkSync(`uploads/${req.body.filename}`);
                        console.log("Delete File successfully.");
                    } catch (error) {
                        console.log(error);
                        return;
                    }

                    res.status(200).json({
                        status: 'success',
                        message: `JSON schema created successfully`
                    });
                }
            });
        })



    } catch (error) {
        res.json({
            error
        });
    }
});

app.listen(5000, () => {
    console.log("server running");
})