import { writeFile } from "fs";
import toJsonSchema = require("to-json-schema");
import { window } from 'vscode';
import { workspace } from 'vscode';
import { join } from 'path';

export default class datamapperServer {

    public static handleFileUpload(fileContent :string,fileName:string,extension :string,callback: (message: any) => void) {
      var jsonObj = JSON.parse(fileContent);
      var schema = toJsonSchema(jsonObj);
      var schemaJson = JSON.stringify(schema);
      
      var currentFolder = workspace.workspaceFolders?.[0];
      if(currentFolder){
        var filePath = join(currentFolder.uri.fsPath,`${fileName}_schema.json`);
        writeFile(filePath,schemaJson,(err)=>{
          if(err){
              window.showErrorMessage("Cant create Json schema");
          }else{
              window.showInformationMessage("Json schema file created");
              callback({ type: 'createdSchema', value: schema});
          }
        })
      }else{
        window.showErrorMessage("No current workspace");
      }
     
    }
}

