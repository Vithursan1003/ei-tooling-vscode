import { writeFile } from "fs";
import toJsonSchema = require("to-json-schema");
import { window } from 'vscode';
import { workspace } from 'vscode';
import { join } from 'path';

export default class datamapperServer {

    public static handleFileUpload(fileContent :string,fileName:string,extension :string) {
      const jsonObj = JSON.parse(fileContent);
      const schema = toJsonSchema(jsonObj);
      window.showInformationMessage(JSON.stringify(schema, null, 2));
      const schemaJson = JSON.stringify(schema);

      const currentFolder = workspace.workspaceFolders?.[0];
      if(currentFolder){
        const filePath = join(currentFolder.uri.fsPath,`${fileName}_schema.json`);
        writeFile(filePath,schemaJson,(err)=>{
          if(err){
              window.showErrorMessage("Cant create Json schema");
          }else{
              window.showInformationMessage("Json schema file created");
          }
        })
      }else{
        window.showErrorMessage("No current workspace");
      }
     
    }
}

