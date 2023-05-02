import { writeFile } from "fs";
import toJsonSchema = require("to-json-schema");
import { window } from 'vscode';
import { workspace } from 'vscode';
import { join } from 'path';
import { parseString } from "xml2js";

export default class datamapperServer {

  public static handleFileUpload(fileContent: string, fileName: string, extension: string, callback: (message: any) => void) {

    // console.log("file extension : ", extension);
    // var schemaJson, schema: any;
    // switch (extension) {
    //   case 'xml': {
    //     parseString(fileContent, (err, result) => {
    //       if (err) {
    //         console.error(err);
    //       } else {
    //         schema = result;
    //         schemaJson = JSON.stringify(result);
    //       }
    //     });
    //     break;
    //   }
    //   case 'json': {
    //     var jsonObj = JSON.parse(fileContent);
    //     schema = toJsonSchema(jsonObj);
    //     schemaJson = JSON.stringify(schema);
    //     break;
    //   }
    // }

    var jsonObj = JSON.parse(fileContent);
    var schema = toJsonSchema(jsonObj);
    var schemaJson = JSON.stringify(schema);
    var node: string;
    if (fileName.endsWith('Input')) {
      node = 'Input';
    } else if (fileName.endsWith('Output')) {
      node = 'Output';
    }

    var currentFolder = workspace.workspaceFolders?.[0];
    if (currentFolder) {
      var filePath = join(currentFolder.uri.fsPath, `${fileName}_schema.json`);
      writeFile(filePath, schemaJson, (err) => {
        if (err) {
          window.showErrorMessage("Cant create Json schema");
        } else {
          window.showInformationMessage("Json schema file created");
          if (node === 'Input') {
            callback({ type: 'InputSchema', value: schema });
          } else {
            callback({ type: 'OutputSchema', value: schema });
          }
        }
      })
    } else {
      window.showErrorMessage("No current workspace");
    }

  }
}

