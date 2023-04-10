/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const fs = __webpack_require__(2);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let myArray = [];
    const newLink = [{
            "sourcePort": {
                "nodeId": "Input",
                "portId": "fullName:value"
            },
            "targetPort": {
                "nodeId": "Split",
                "portId": "Value:String"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Split",
                "portId": "Result1:String"
            },
            "targetPort": {
                "nodeId": "Output",
                "portId": "firstName:value"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Split",
                "portId": "Result2:String"
            },
            "targetPort": {
                "nodeId": "Output",
                "portId": "lastName:value"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "address1:value"
            },
            "targetPort": {
                "nodeId": "Concat",
                "portId": "Value1:String"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "address2:value"
            },
            "targetPort": {
                "nodeId": "Concat",
                "portId": "Value2:String"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Concat",
                "portId": "Result:String"
            },
            "targetPort": {
                "nodeId": "Output",
                "portId": "address:value"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "age:value"
            },
            "targetPort": {
                "nodeId": "Output",
                "portId": "age:value"
            },
            "isChecked": false
        }
    ];
    const transformedData = newLink;
    //console.log(transformedData);
    const Input = {
        "$id": "https://example.com/person.schema.json",
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "Person",
        "type": "object",
        "properties": {
            "fullName": {
                "type": "string",
                "description": "The person's full name."
            },
            "address1": {
                "description": "Age in years which must be equal to or greater than zero.",
                "type": "string",
                "minimum": 0
            },
            "address2": {
                "description": "Age in years which must be equal to or greater than zero.",
                "type": "string",
                "minimum": 0
            },
            "age": {
                "description": "Age in years which must be equal to or greater than zero.",
                "type": "integer",
                "minimum": 0
            }
        }
    };
    const Output = {
        "$id": "https://example.com/person.schema.json",
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "Person",
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "description": "The person's first name."
            },
            "lastName": {
                "type": "string",
                "description": "The person's last name."
            },
            "address": {
                "description": "Age in years which must be equal to or greater than zero.",
                "type": "string",
                "minimum": 0
            },
            "age": {
                "description": "Age in years which must be equal to or greater than zero.",
                "type": "integer",
                "minimum": 0
            }
        }
    };
    let arrayInput = createArray(Input, "input");
    let arrayOutput = createArray(Output, "output");
    function createArray(outputJSON, string1) {
        let dmcArray = [];
        let string = string1;
        dmcArray.push([string, string]);
        for (let prop in outputJSON.properties) {
            let myArray = [];
            myArray[0] = string;
            let i = 1;
            i = includePropToArray(outputJSON, myArray, prop, i);
        }
        function recursiveproperty(object1, JSONarray, j) {
            for (let prop in object1.properties) {
                j = includePropToArray(object1, JSONarray, prop, j);
            }
        }
        function includePropToArray(JSONobject, array, prop, k) {
            array[k] = prop;
            const str = array.join(".");
            if (string1 === "output") {
                dmcArray.push([str, prop, false]);
            }
            else if (string1 === "input") {
                dmcArray.push([str, prop]);
            }
            if (JSONobject.properties[prop].type === 'object') {
                k++;
                recursiveproperty(JSONobject.properties[prop], array, k);
            }
            return k;
        }
        return dmcArray;
    }
    let inputArray = arrayInput;
    let outputArray = arrayOutput;
    function substring(str, start, end) {
        let str1 = str.substring(start, end);
        return str1;
    }
    for (let i = 0; i < transformedData.length; i++) { //initial loop
        let action = transformedData[i].targetPort.nodeId;
        if (transformedData[i].isChecked === false) {
            transformDataAndAction(action, transformedData, i);
        }
    }
    for (let i = 0; i < transformedData.length; i++) { //initial loop
        let action = transformedData[i].sourcePort.nodeId;
        if (transformedData[i].isChecked === false) {
            transformDataAndAction(action, transformedData, i);
        }
    }
    function transformDataAndAction(action, transformedData, i) {
        switch (action) {
            //I. When the action is concatenation
            case "Concat":
                {
                    var outputString = ""; //declaring outputs
                    var inputString1, inputString2; //declaring inputs
                    var inputkey1, inputkey2, outputkey; //declaring key values
                    for (let j = i; j < transformedData.length; j++) { //check the same action in the remaining objects
                        if (action === transformedData[j].sourcePort.nodeId) {
                            if (transformedData[j].sourcePort.portId.toString().includes("Result")) {
                                var string = transformedData[j].targetPort.portId.toString();
                                outputkey = substring(string, 0, string.indexOf(":"));
                            }
                            transformedData[j].isChecked = true;
                        }
                        else if (action === transformedData[j].targetPort.nodeId) {
                            if (transformedData[j].targetPort.portId.toString().includes("Value1")) {
                                var string = transformedData[j].sourcePort.portId.toString();
                                inputkey1 = substring(string, 0, string.indexOf(":"));
                            }
                            if (transformedData[j].targetPort.portId.toString().includes("Value2")) {
                                var string = transformedData[j].sourcePort.portId.toString();
                                inputkey2 = substring(string, 0, string.indexOf(":"));
                            }
                            transformedData[j].isChecked = true;
                        }
                    }
                    if (typeof (inputkey1) == "string" && typeof (inputkey2) == "string") {
                        //code to be used in .dmc file
                        for (let k = 0; k < inputArray.length; k++) {
                            if (inputkey1 === inputArray[k][1]) {
                                inputString1 = inputArray[k][0];
                            }
                            if (inputkey2 === inputArray[k][1]) {
                                inputString2 = inputArray[k][0];
                            }
                        }
                        for (let k = 0; k < outputArray.length; k++) {
                            if (outputArray[k][1] === outputkey) {
                                outputString = outputArray[k][0];
                                outputArray[k][0] = outputString + " = " + inputString1 + ".concat(\" \", " + inputString2 + ");";
                                outputArray[k][2] = true;
                            }
                        }
                    }
                }
                break;
            //II. When the action is to split a string
            case "Split":
                {
                    //declaring inputs
                    var inputString, outputString1, outputString2;
                    //declaring key values												
                    var inputkey = " ", outputkey1 = " ", outputkey2 = " ";
                    //check the same action in the remaining objects
                    for (let j = i; j < transformedData.length; j++) {
                        if (action === transformedData[j].sourcePort.nodeId) {
                            if (transformedData[j].sourcePort.portId.toString().includes("Result1")) {
                                var string = transformedData[j].targetPort.portId.toString();
                                //console.log(string);
                                outputkey1 = substring(string, 0, string.indexOf(":"));
                                //console.log("Outputkey1" + outputkey1);
                            }
                            else if (transformedData[j].sourcePort.portId.toString().includes("Result2")) {
                                var string = transformedData[j].targetPort.portId.toString();
                                //console.log(string);
                                outputkey2 = substring(string, 0, string.indexOf(":"));
                                //console.log("Outputkey2" + outputkey2);
                            }
                            transformedData[j].isChecked = true;
                        }
                        else if (action === transformedData[j].targetPort.nodeId) {
                            if (transformedData[j].targetPort.portId.toString().includes("Value")) {
                                var string = transformedData[j].sourcePort.portId.toString();
                                //console.log(string);
                                inputkey = substring(string, 0, string.indexOf(":"));
                            }
                            transformedData[j].isChecked = true;
                        }
                    }
                    if (inputkey != null) {
                        for (let k = 0; k < inputArray[0].length; k++) {
                            if (inputkey === inputArray[k][1]) {
                                inputString = inputArray[k][0];
                            }
                        }
                        for (let k = 0; k < outputArray.length; k++) {
                            if (outputkey1 === outputArray[k][1]) {
                                outputString1 = outputArray[k][0];
                                outputArray[k][0] = "\nvar Split_1_0 = " + inputString + ".split(\" \");\n\n" + outputString1 + " = Split_1_0[0];";
                                outputArray[k][2] = true;
                            }
                        }
                        for (let k = 0; k < outputArray.length; k++) {
                            if (outputArray[k][1] === outputkey2) {
                                outputString2 = outputArray[k][0];
                                outputArray[k][0] = outputString2 + " = Split_1_0[1];";
                                outputArray[k][2] = true;
                            }
                        }
                        //code to be used in .dmc file
                    }
                }
                break;
            //III. Default case
            default:
                break;
        }
    }
    for (let j = 0; j < transformedData.length; j++) {
        if (transformedData[j].isChecked === false) {
            var normalinputkey, normaloutputkey, normaloutputstring, normalinputstring;
            if (transformedData[j].sourcePort.nodeId === "Output") {
                normaloutputkey = substring(transformedData[j].targetPort.portId.toString(), 0, transformedData[j].targetPort.portId.toString().indexOf(":"));
                normalinputkey = substring(transformedData[j].sourcePort.portId.toString(), 0, transformedData[j].sourcePort.portId.toString().indexOf(":"));
                console.log("Outputkey" + normaloutputkey);
                console.log("Inputkey" + normalinputkey);
            }
            else if (transformedData[j].targetPort.nodeId === "Output") {
                normaloutputkey = substring(transformedData[j].sourcePort.portId.toString(), 0, transformedData[j].sourcePort.portId.toString().indexOf(":"));
                normalinputkey = substring(transformedData[j].targetPort.portId.toString(), 0, transformedData[j].targetPort.portId.toString().indexOf(":"));
            }
            if (normalinputkey !== null) {
                for (let k = 0; k < inputArray.length; k++) {
                    if (normalinputkey === inputArray[k][1]) {
                        normalinputstring = inputArray[k][0];
                    }
                }
                for (let k = 0; k < outputArray.length; k++) {
                    if (normaloutputkey === outputArray[k][1]) {
                        normaloutputstring = outputArray[k][0];
                        outputArray[k][0] = normaloutputstring + " = " + normalinputstring + ";";
                        outputArray[k][2] = true;
                    }
                }
            }
        }
    }
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "hivithu" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('hidmc.helloWorld', async () => {
        //later codes
        const fileName = 'newFile.dmc';
        const filePath = 'C:/Users/WSO2/' + fileName;
        myArray[0] = "map_S_" + Input.title + "_S_" + Output.title + " = function(){ ";
        for (let k = 0; k < outputArray.length; k++) {
            if (outputArray[k][2] === true) {
                myArray[k + 1] = outputArray[k][0];
            }
            else {
                myArray[k + 1] = outputArray[k][0] + " = {};";
            }
        }
        myArray[myArray.length + 1] = "return " + outputArray[0][0] + ";\n}";
        const content = myArray.join('\n');
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                vscode.window.showErrorMessage('Unable to create file: ' + err.message);
                return;
            }
            vscode.window.showInformationMessage('File created successfully: ' + filePath);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//For future references
// function getProperty(property: any) {
// 	for (const property in properties) {
// 		if (properties.hasOwnProperty(property)) {
// 			//vscode.window.showInformationMessage();
// 			//console.log(Input1.hasOwnProperty(property));
// 			return property;
// 			//console.log(Input1.hasOwnProperty('name')); // true
// 		}
// 	}
// 	return null;
// }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map