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
function activate(context) {
    const newLink = [
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "fullName:string",
                "ID": "418dd158-e655-4d89-b38a-8c7f01eba00a",
                "alignment": "right"
            },
            "targetPort": {
                "nodeId": "IfElse",
                "portId": "Condition:Boolean",
                "ID": "2b4bb5c5-4518-4b66-8cb0-e207912b93fb",
                "alignment": "left"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "address1:string",
                "ID": "418dd158-e655-4d89-b38a-8c7f01eba00a",
                "alignment": "right"
            },
            "targetPort": {
                "nodeId": "IfElse",
                "portId": "If:Boolean",
                "ID": "2b4bb5c5-4518-4b66-8cb0-e207912b93fb",
                "alignment": "left"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "Input",
                "portId": "address2:string",
                "ID": "418dd158-e655-4d89-b38a-8c7f01eba00a",
                "alignment": "right"
            },
            "targetPort": {
                "nodeId": "IfElse",
                "portId": "Then:Boolean",
                "ID": "2b4bb5c5-4518-4b66-8cb0-e207912b93fb",
                "alignment": "left"
            },
            "isChecked": false
        },
        {
            "sourcePort": {
                "nodeId": "IfElse",
                "portId": "Result:Boolean",
                "ID": "2b4bb5c5-4518-4b66-8cb0-e207912b93fb",
                "alignment": "right"
            },
            "targetPort": {
                "nodeId": "Output",
                "portId": "firstName:string",
                "ID": "548397e6-0a6f-4718-8f21-d2b978674037",
                "alignment": "left"
            },
            "isChecked": false
        }
    ];
    const transformedData = newLink;
    // === //
    let inputID = {};
    for (let i in transformedData) {
        if (transformedData[i].sourcePort.nodeId === "Input") {
            inputID = transformedData[i].sourcePort.ID;
        }
        else if (transformedData[i].targetPort.nodeId === "Input") {
            inputID = transformedData[i].targetPort.ID;
        }
    }
    // === //
    const data1 = fs.readFileSync('C:/Users/WSO2/Input.txt', { encoding: 'utf8', flag: 'r' });
    let inputData = JSONStringToParse(data1);
    const data3 = fs.readFileSync('C:/Users/WSO2/Output.txt', { encoding: 'utf8', flag: 'r' });
    let outputData = JSONStringToParse(data3);
    function JSONStringToParse(dataString) {
        return JSON.parse(dataString);
    }
    // === //
    let arrayInput = createArray(inputData, "Input");
    let arrayOutput = createArray(outputData, "Output");
    console.log(arrayOutput);
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
            if (string1 === "Output") {
                dmcArray.push([str, prop, false]);
            }
            else if (string1 === "Input") {
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
    // === //
    let transformDataArray = [];
    let inputQueueArray1 = [];
    inputQueueArray1.push(["Input", inputID]);
    let b = 0;
    let data = [];
    let actionnode = {}, actionID = {};
    for (let i = 0; i < transformedData.length; i++) {
        if (!(transformedData[i].sourcePort.nodeId === "Input" && transformedData[i].targetPort.nodeId === "Output") || (transformedData[i].sourcePort.nodeId === "Output" && transformedData[i].targetPort.nodeId === "Input")) {
            if (transformedData[i].sourcePort.nodeId === "Input" || transformedData[i].sourcePort.nodeId === "Output") {
                actionnode = transformedData[i].targetPort.nodeId;
                actionID = transformedData[i].targetPort.ID;
                data = checkTransformDataArray(actionnode, actionID, b);
            }
            else if (transformedData[i].targetPort.nodeId === "Input" || transformedData[i].targetPort.nodeId === "Output") {
                actionnode = transformedData[i].sourcePort.nodeId;
                actionID = transformedData[i].sourcePort.ID;
                data = checkTransformDataArray(actionnode, actionID, b);
            }
            else {
                actionnode = transformedData[i].sourcePort.nodeId;
                actionID = transformedData[i].sourcePort.ID;
                data = checkTransformDataArray(actionnode, actionID, b);
                actionnode = transformedData[i].targetPort.nodeId;
                actionID = transformedData[i].targetPort.ID;
                data = checkTransformDataArray(actionnode, actionID, b);
            }
            if (data) {
                let c = 0;
                for (let k = 0; k < transformDataArray.length; k++) {
                    if (transformDataArray[k] === data) {
                        c++;
                    }
                }
                if (c === 0) {
                    transformDataArray.push(data);
                    inputQueueArray1.push([`${data[0]}`, `${data[1]}`]);
                    b++;
                }
            }
        }
    }
    function checkTransformDataArray(actionnode, actionID, b) {
        let c = 0;
        let d = [];
        for (let i in transformDataArray) {
            if (transformDataArray[i][1] === actionID) {
                c++;
            }
        }
        if (c === 0) {
            d = pushToTransformDataArray(actionnode, actionID, b);
        }
        return d;
    }
    function pushToTransformDataArray(actionnode, actionID, i) {
        let e = [];
        e[0] = actionnode;
        e[1] = actionID;
        switch (actionnode) {
            case "Split":
            case "UpperCase":
            case "LowerCase":
            case "Trim":
            case "StringLength":
            case "StringToNumber":
            case "ToString":
            case "StringToBoolean":
                e[2] = `${actionnode}_${i + 1}_Input`;
                e[3] = false;
                break;
            case "Concat":
                e[2] = `Concat_${i + 1}_0`;
                e[3] = false;
                e[4] = `Concat_${i + 1}_1`;
                e[5] = false;
                break;
            case "StartsWith":
            case "EndsWith":
            case "Match":
                e[2] = `${actionnode}_${i + 1}_Input`;
                e[3] = false;
                e[4] = `${actionnode}_${i + 1}_Pattern`;
                e[5] = false;
                break;
            case "Replace":
                e[2] = `Replace_${i + 1}_Input`;
                e[3] = false;
                e[4] = `Replace_${i + 1}_Target`;
                e[5] = false;
                e[6] = `Replace_${i + 1}_ReplaceWith`;
                e[7] = false;
                break;
            case "Substring":
                e[2] = `Substring_${i + 1}_Input`;
                e[3] = false;
                e[4] = `Substring_${i + 1}_StartIndex`;
                e[5] = false;
                e[6] = `Substring_${i + 1}_length`;
                e[7] = false;
                break;
            case "IfElse":
                e[2] = `IfElse_${i + 1}_Condition`;
                e[3] = false;
                e[4] = `IfElse_${i + 1}_Then`;
                e[5] = false;
                e[6] = `IfElse_${i + 1}_Else`;
                e[7] = false;
                break;
            case "AND":
            case "OR":
                e[2] = `Input_1`;
                e[3] = false;
                e[4] = `Input_2`;
                e[5] = false;
                break;
            case "NOT":
                e[2] = `Input`;
                e[3] = false;
                break;
            default: break;
        }
        e[e.length] = `${actionnode}_${i + 1}_Output`;
        e[e.length + 1] = false;
        return e;
    }
    // === //
    let simplified_transformDataArray = transformDataArray.filter(j => j.length !== 0);
    console.log(simplified_transformDataArray);
    let simplified_inputQueueArray1 = inputQueueArray1.filter(j => j[0] !== "undefined");
    // === //
    let outputObjectArray = transformedData.filter(j => j.targetPort.nodeId === "Output" || j.sourcePort.nodeId === "Output");
    let outputDMCArray = [];
    for (let i in outputObjectArray) {
        if (outputObjectArray[i].sourcePort.nodeId === "Output") {
            outputDMCArray.push(outputDMC(outputObjectArray[i].sourcePort.nodeId, outputObjectArray[i].sourcePort.portId, outputObjectArray[i].targetPort.nodeId, outputObjectArray[i].targetPort.portId, outputObjectArray[i].targetPort.ID));
            outputObjectArray[i].isChecked = true;
        }
        else if (outputObjectArray[i].targetPort.nodeId === "Output") {
            outputDMCArray.push(outputDMC(outputObjectArray[i].targetPort.nodeId, outputObjectArray[i].targetPort.portId, outputObjectArray[i].sourcePort.nodeId, outputObjectArray[i].sourcePort.portId, outputObjectArray[i].sourcePort.ID));
            outputObjectArray[i].isChecked = true;
        }
    }
    function outputDMC(sourcePortNodeID, sourcePortPortID, targetPortNodeID, targetPortPortID, targetPortID) {
        let e = "";
        let f = "";
        for (let i in arrayOutput) {
            if (arrayOutput[i][1] === trimTheStringUptoColon(sourcePortPortID)) {
                f = arrayOutput[i][0];
                arrayOutput[i][2] = true;
            }
        }
        let action = targetPortNodeID;
        switch (action) {
            case "Split":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (targetPortPortID === "Result1:String") {
                            e = simplified_transformDataArray[i][4] + "[0]";
                        }
                        else if (targetPortPortID === "Result2:String") {
                            e = simplified_transformDataArray[i][4] + "[1]";
                        }
                    }
                }
                break;
            case "Concat":
            case "StartsWith":
            case "EndsWith":
            case "Match":
            case "AND":
            case "OR":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        e = simplified_transformDataArray[i][6];
                    }
                }
                break;
            case "UpperCase":
            case "LoweCase":
            case "StringLength":
            case "Trim":
            case "StringToNumber":
            case "ToString":
            case "StringToBoolean":
            case "NOT":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        e = simplified_transformDataArray[i][4];
                    }
                }
                break;
            case "Replace":
            case "Substring":
            case "IfElse":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        e = simplified_transformDataArray[i][8];
                    }
                }
                break;
            default:
                //e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID);
                console.log("1 " + trimTheStringFromColumnToEnd(sourcePortPortID) + " 2 " + trimTheStringFromColumnToEnd(targetPortPortID));
                if (trimTheStringFromColumnToEnd(sourcePortPortID) === trimTheStringFromColumnToEnd(targetPortPortID)) {
                    e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID);
                }
                else {
                    if (trimTheStringFromColumnToEnd(sourcePortPortID) === "string") {
                        e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID) + ".toString()";
                    }
                    else if (trimTheStringFromColumnToEnd(sourcePortPortID) === "number") {
                        e = "parseInt((" + targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID) + "),10)";
                    }
                }
        }
        return `${f} = ${e};`;
    }
    for (let i in arrayOutput) {
        if (arrayOutput[i][2] === false) {
            outputDMCArray.push(`${arrayOutput[i][0]} = {};`);
        }
    }
    const outputdmc = outputDMCArray.join('\n');
    // === //
    let inputObjectArray = transformedData.filter(j => j.targetPort.nodeId !== "Output" && j.sourcePort.nodeId !== "Output");
    let inputDMCArray = [];
    for (let z in simplified_inputQueueArray1) {
        for (let j in inputObjectArray) {
            if (inputObjectArray[j].sourcePort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].sourcePort.alignment === "right") {
                inputDmcPush(inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID, inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID);
            }
            else if (inputObjectArray[j].targetPort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].targetPort.alignment === "right") {
                inputDmcPush(inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID, inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID);
            }
        }
        //inputQueueProgressPush(simplified_inputQueue[z][1]);
    }
    function inputDmcPush(sourcePortNodeID, sourcePortPortID, sourcePortID, targetPortNodeID, targetPortPortID, targetPortID) {
        let e = "";
        let f = "";
        let g = sourceEqualsTarget(targetPortPortID, targetPortNodeID, sourcePortID, sourcePortPortID);
        //console.log("g: " + g + " " + sourcePortID);
        let action = sourcePortNodeID;
        switch (action) {
            case "Split":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} = ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString.split(" ");`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "Concat":
                let action2 = action.toString().charAt(0).toLowerCase() + action.toString().slice(1);
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value1:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "Value2:String") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
                            f = `${simplified_transformDataArray[i][6]} = ${simplified_transformDataArray[i][2]}.toString().${action2}.(${simplified_transformDataArray[i][4]}.toString());`;
                            simplified_transformDataArray[i][7] = true;
                        }
                    }
                }
                break;
            case "StartsWith":
            case "EndsWith":
            case "Match":
                let action1 = action.toString().charAt(0).toLowerCase() + action.toString().slice(1);
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "Pattern:String") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
                            f = `${simplified_transformDataArray[i][6]} = ${simplified_transformDataArray[i][2]}.toString().${action1}.(${simplified_transformDataArray[i][4]}.toString());`;
                            simplified_transformDataArray[i][7] = true;
                        }
                    }
                }
                break;
            case "AND":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value1:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "Value2:String") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
                            f = `${simplified_transformDataArray[i][6]} = ${simplified_transformDataArray[i][2]}&&(${simplified_transformDataArray[i][4]});`;
                            simplified_transformDataArray[i][7] = true;
                        }
                    }
                }
                break;
            case "OR":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value1:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "Value2:String") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
                            f = `${simplified_transformDataArray[i][6]} = ${simplified_transformDataArray[i][2]}||${simplified_transformDataArray[i][4]};`;
                            simplified_transformDataArray[i][7] = true;
                        }
                    }
                }
                break;
            case "NOT":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = !(${simplified_transformDataArray[i][2]});`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "UpperCase":
            case "LowerCase":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString().to${action}();`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "ToString":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString();`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "StringToNumber":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = Number(${simplified_transformDataArray[i][2]});`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "StringToBoolean":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString().toLowerCase() === true;`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "Trim":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString().trim();`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "StringLength":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] !== true) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
                            f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString().length;`;
                            simplified_transformDataArray[i][5] = true;
                        }
                    }
                }
                break;
            case "Replace":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "Pattern:String") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        else if (sourcePortPortID === "Target:String") {
                            if (simplified_transformDataArray[i][7] === false) {
                                e = `let ${simplified_transformDataArray[i][6]} =  ${g};`;
                                simplified_transformDataArray[i][7] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] === true && simplified_transformDataArray[i][9] !== true) {
                            f = `${simplified_transformDataArray[i][8]} = ${simplified_transformDataArray[i][2]}.toString().replace(${simplified_transformDataArray[i][4]},${simplified_transformDataArray[i][6]});`;
                            simplified_transformDataArray[i][9] = true;
                        }
                    }
                }
                break;
            case "Substring":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Value:String") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "StartIndex:Number") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        else if (sourcePortPortID === "Length:Number") {
                            if (simplified_transformDataArray[i][7] === false) {
                                e = `let ${simplified_transformDataArray[i][6]} =  ${g};`;
                                simplified_transformDataArray[i][7] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] === true && simplified_transformDataArray[i][9] !== true) {
                            f = `${simplified_transformDataArray[i][8]} = ${simplified_transformDataArray[i][2]}.toString().replace(${simplified_transformDataArray[i][4]},${simplified_transformDataArray[i][6]});`;
                            simplified_transformDataArray[i][9] = true;
                        }
                    }
                }
                break;
            case "IfElse":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (sourcePortPortID === "Condition:Boolean") {
                            if (simplified_transformDataArray[i][3] === false) {
                                e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
                                simplified_transformDataArray[i][3] = true;
                            }
                        }
                        else if (sourcePortPortID === "If:Boolean") {
                            if (simplified_transformDataArray[i][5] === false) {
                                e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
                                simplified_transformDataArray[i][5] = true;
                            }
                        }
                        else if (sourcePortPortID === "Then:Boolean") {
                            if (simplified_transformDataArray[i][7] === false) {
                                e = `let ${simplified_transformDataArray[i][6]} =  ${g};`;
                                simplified_transformDataArray[i][7] = true;
                            }
                        }
                        if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] === true && simplified_transformDataArray[i][9] !== true) {
                            f = `${simplified_transformDataArray[i][8]} = (${simplified_transformDataArray[i][2]})?(${simplified_transformDataArray[i][4]}):(${simplified_transformDataArray[i][6]});`;
                            simplified_transformDataArray[i][9] = true;
                        }
                    }
                }
                break;
        }
        if (e !== "") {
            inputDMCArray.push(e);
        }
        if (f !== "") {
            inputDMCArray.push(f + "\n");
        }
    }
    function sourceEqualsTarget(targetPortPortID, targetPortNodeID, targetPortID, sourcePortPortID) {
        let string = "";
        let action = targetPortNodeID;
        switch (action) {
            case "Split":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        if (trimTheStringUptoColon(targetPortPortID) === "Result1") {
                            string = `${simplified_transformDataArray[i][4]}[0]`;
                        }
                        else if (trimTheStringUptoColon(targetPortPortID) === "Result2") {
                            string = `${simplified_transformDataArray[i][4]}[1]`;
                        }
                    }
                }
                break;
            case "Concat":
            case "StartsWith":
            case "EndsWith":
            case "Match":
            case "OR":
            case "AND":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        string = `${simplified_transformDataArray[i][6]}`;
                    }
                }
                break;
            case "UpperCase":
            case "LowerCase":
            case "StringLength":
            case "Trim":
            case "StringToNumber":
            case "StringToBoolean":
            case "ToString":
            case "NOT":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        string = `${simplified_transformDataArray[i][4]}`;
                    }
                }
                break;
            case "Replace":
            case "Substring":
            case "IfElse":
                for (let i in simplified_transformDataArray) {
                    if (simplified_transformDataArray[i][1] === targetPortID) {
                        string = `${simplified_transformDataArray[i][8]}`;
                    }
                }
                break;
            default:
                string = `${targetPortNodeID}.${trimTheStringUptoColon(targetPortPortID)}`;
        }
        return string;
    }
    const inputdmc = inputDMCArray.filter(j => j.length !== 0).join('\n');
    // === //
    function trimTheStringUptoColon(str) {
        let str1 = str.toString();
        return str1.substring(0, str1.indexOf(":"));
    }
    function trimTheStringFromColumnToEnd(str) {
        let str1 = str.toString();
        return str1.substring(str1.indexOf(":") + 1, str1.length);
    }
    let disposable = vscode.commands.registerCommand('hidmc.helloWorld', async () => {
        //later codes
        const myArray = [];
        const fileName = 'newFile1.dmc';
        const filePath = 'C:/Users/WSO2/' + fileName;
        myArray[0] = "map_S_" + inputData.title + "_S_" + outputData.title + " = function(){ \n";
        myArray[1] = inputdmc;
        myArray[2] = outputdmc;
        myArray[3] = "\nreturn Output;\n}";
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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map