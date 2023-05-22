/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';

// Part1 //

interface DataModel {
	sourcePort: PortModel;
	targetPort: PortModel;
	isChecked: boolean;
}

interface PortModel {
	nodeId: {};
	portId: {};
	ID: {};
	alignment: {};
}

interface Details {
	$id: string;
	$schema: string;
	title: string;
	type: string;
	properties: object;
}

interface Details2 {
	$id: string;
	$schema: string;
	title: string;
	type: string;
	properties: object;
}

export function activate(context: vscode.ExtensionContext) {

	// Part2 //

	const newLink = [
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "age:string",
				"ID": "4fc3cb98-5517-404a-ab91-135327becc76",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "StringToNumber",
				"portId": "Value:String",
				"ID": "0a1dd9ff-0ab0-4ce1-82cd-b8ed72bfe083",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "StringToNumber",
				"portId": "Result:Number",
				"ID": "0a1dd9ff-0ab0-4ce1-82cd-b8ed72bfe083",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Floor",
				"portId": "Value:Number",
				"ID": "a1bd93e6-e7b4-4b46-872e-f1963bd39637",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Floor",
				"portId": "Result:Number",
				"ID": "a1bd93e6-e7b4-4b46-872e-f1963bd39637",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "ToString",
				"portId": "Value:String/Number/Boolean",
				"ID": "160c9573-b2ee-4b09-9119-fd7c1ae17bc0",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "ToString",
				"portId": "Result:String",
				"ID": "160c9573-b2ee-4b09-9119-fd7c1ae17bc0",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "firstName:string",
				"ID": "20b97318-08f1-4596-8150-a2e168f3bffa",
				"alignment": "left"
			},
			"isChecked": false
		}
	];

	const transformedData: DataModel[] = newLink;
	//console.log(transformedData);

	// Part3 //

	let inputID: {} = {};

	for (let i in transformedData) {
		if (transformedData[i].sourcePort.nodeId === "Input") {
			inputID = transformedData[i].sourcePort.ID;
		} else if (transformedData[i].targetPort.nodeId === "Input") {
			inputID = transformedData[i].targetPort.ID;
		}
	}

	// Part 4 //

	const data1 = fs.readFileSync('C:/Users/WSO2/Input.txt',
		{ encoding: 'utf8', flag: 'r' });

	let inputData: Details = JSONStringToParse(data1);

	const data3 = fs.readFileSync('C:/Users/WSO2/Output.txt',
		{ encoding: 'utf8', flag: 'r' });

	let outputData: Details2 = JSONStringToParse(data3);

	function JSONStringToParse(dataString: string) {
		return JSON.parse(dataString);
	}

	// console.log(inputData);
	// console.log(outputData);

	// Part 5 //

	let arrayInput = createArray(inputData, "Input");
	let arrayOutput = createArray(outputData, "Output");
	//console.log(arrayOutput);

	function createArray(outputJSON: any, string1: string): any[][] {
		let dmcArray: any[][] = [];
		let string = string1;
		dmcArray.push([string, string]);

		for (let prop in outputJSON.properties) {
			let myArray: any[] = [];
			myArray[0] = string;
			let i = 1;
			i = includePropToArray(outputJSON, myArray, prop, i);
		}

		function recursiveproperty(object1: any, JSONarray: any[], j: number) {
			for (let prop in object1.properties) {
				j = includePropToArray(object1, JSONarray, prop, j);
			}
		}

		function includePropToArray(JSONobject: any, array: any[], prop: any, k: number): number {
			array[k] = prop;
			const str: string = array.join(".");
			if (string1 === "Output") {
				dmcArray.push([str, prop, false]);
			} else if (string1 === "Input") {
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

	// Part 6 //

	let transformDataArray: any[][] = [];
	let inputQueueArray1: any[][] = [];
	inputQueueArray1.push(["Input", inputID]);
	let b = 0;
	let data: any[] = [];
	let actionnode: {} = {}, actionID: {} = {};

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

	function checkTransformDataArray(actionnode: any, actionID: any, b: any): any[] {
		let c = 0;
		let d: any = [];
		for (let i in transformDataArray) {
			if (transformDataArray[i][1] === actionID) {
				c++;
			}
		}
		if (c === 0) {
			d = pushToTransformDataArray(actionnode, actionID, b,);
		}
		return d;
	}

	function pushToTransformDataArray(actionnode: any, actionID: any, i: any): any[] {
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
			case "Add":
			case "Multiply":
			case "Min":
			case "Max":
			case "Compare":
				e[2] = `${actionnode}_Input_1`;
				e[3] = false;
				e[4] = `${actionnode}_Input_2`;
				e[5] = false;
				break;
			case "Subtract":
				e[2] = `Input`;
				e[3] = false;
				e[4] = `Subtrahend`;
				e[5] = false;
				break;
			case "Divide":
				e[2] = `Input`;
				e[3] = false;
				e[4] = `Divisor`;
				e[5] = false;
				break;
			case "SetPrecision":
				e[2] = `Input`;
				e[3] = false;
				e[4] = `NumberOfDigits`;
				e[5] = false;
				break;
			case "NOT":
			case "Round":
			case "Ceiling":
			case "Floor":
			case "AbsoluteValue":
				e[2] = `${actionnode}_Input`;
				e[3] = false;
				break;
			default: break;
		}
		e.push(`${actionnode}_${i + 1}_Output`);
		e.push(false);
		return e;
	}

	// Part 7 //

	let simplified_transformDataArray = transformDataArray.filter(j => j.length !== 0);
	//console.log(simplified_transformDataArray);

	let simplified_inputQueueArray1 = inputQueueArray1.filter(j => j[0] !== "undefined");
	//console.log(simplified_inputQueueArray1);

	// Part 8 //

	let outputObjectArray = transformedData.filter(j => j.targetPort.nodeId === "Output" || j.sourcePort.nodeId === "Output");

	let outputDMCArray: string[] = [];

	for (let i in outputObjectArray) {
		if (outputObjectArray[i].sourcePort.nodeId === "Output") {
			outputDMCArray.push(outputDMC(outputObjectArray[i].sourcePort.nodeId, outputObjectArray[i].sourcePort.portId, outputObjectArray[i].targetPort.nodeId, outputObjectArray[i].targetPort.portId, outputObjectArray[i].targetPort.ID));
			outputObjectArray[i].isChecked = true;
		} else if (outputObjectArray[i].targetPort.nodeId === "Output") {
			outputDMCArray.push(outputDMC(outputObjectArray[i].targetPort.nodeId, outputObjectArray[i].targetPort.portId, outputObjectArray[i].sourcePort.nodeId, outputObjectArray[i].sourcePort.portId, outputObjectArray[i].sourcePort.ID));
			outputObjectArray[i].isChecked = true;
		}
	}

	function outputDMC(sourcePortNodeID: {}, sourcePortPortID: {}, targetPortNodeID: {}, targetPortPortID: {}, targetPortID: {}): string {
		let e: string = "";
		let f: string = "";
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
						} else if (targetPortPortID === "Result2:String") {
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
			case "Add":
			case "Multiply":
			case "Min":
			case "Max":
			case "Subtract":
			case "Divide":
			case "SetPrecision":
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
			case "Round":
			case "Ceiling":
			case "Floor":
			case "AbsoluteValue":
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
				if (trimTheStringFromColumnToEnd(sourcePortPortID) === trimTheStringFromColumnToEnd(targetPortPortID)) {
					e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID);
				} else {
					if (trimTheStringFromColumnToEnd(sourcePortPortID) === "String") {
						e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID) + ".toString()";
					} else if (trimTheStringFromColumnToEnd(sourcePortPortID) === "Number") {
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

	// Part 9 //

	function trimTheStringUptoColon(str: {}): string {
		let str1 = str.toString();
		return str1.substring(0, str1.indexOf(":"));
	}

	function trimTheStringFromColumnToEnd(str: {}): string {
		let str1 = str.toString();
		return str1.substring(str1.indexOf(":") + 1, str1.length);
	}

	// Part 10 //

	let inputObjectArray = transformedData.filter(j => j.targetPort.nodeId !== "Output" && j.sourcePort.nodeId !== "Output");

	let inputDMCArray: string[] = [];

	for (let z in simplified_inputQueueArray1) {
		for (let j in inputObjectArray) {
			if (inputObjectArray[j].sourcePort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].sourcePort.alignment === "right") {
				inputDmcPush(inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID, inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID);
			} else if (inputObjectArray[j].targetPort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].targetPort.alignment === "right") {
				inputDmcPush(inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID, inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID);
			}
		}
	}

	function inputDmcPush(sourcePortNodeID: {}, sourcePortPortID: {}, sourcePortID: {}, targetPortNodeID: {}, targetPortPortID: {}, targetPortID: {}) {
		let e: string = "";
		let f: string = "";
		let g: string = sourceEqualsTarget(targetPortPortID, targetPortNodeID, sourcePortID, sourcePortPortID);
		let action = sourcePortNodeID;
		switch (action) {
			case "Split":
			case "StringToNumber":
			case "StringToBoolean":
			case "Trim":
			case "StringLength":
			case "UpperCase":
			case "LowerCase":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:String") {
							if (simplified_transformDataArray[i][3] !== true) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						}
						f = StringOperationPush1(simplified_transformDataArray[i], action);
					}
				}
				break;
			case "Concat":
				let action2 = action.toString().charAt(0).toLowerCase() + action.toString().slice(1);
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value1:String") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Value2:String") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
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
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Pattern:String") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
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
			case "OR":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value1:String") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Value2:String") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						f = andOrActionPush(simplified_transformDataArray[i], action);
					}
				}
				break;
			case "Add":
			case "Multiply":
			case "Max":
			case "Min":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value1:Number") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Value2:Number") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						f = arithmeticOperationPush1(simplified_transformDataArray[i], action);
					}
				}
				break;
			case "Subtract":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:Number") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Subtrahend:Number") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
							f = `${simplified_transformDataArray[i][6]} =  ${simplified_transformDataArray[i][2]} - ${simplified_transformDataArray[i][4]};`;
							simplified_transformDataArray[i][7] = true;
						}
					}
				}
				break;
			case "Divide":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:Number") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Divisor:Number") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
							f = `${simplified_transformDataArray[i][6]} =  ${simplified_transformDataArray[i][2]}/${simplified_transformDataArray[i][4]};`;
							simplified_transformDataArray[i][7] = true;
						}
					}
				}
				break;
			case "SetPrecision":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:Number") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "NumberOfDigits:Number") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
							f = `${simplified_transformDataArray[i][6]} =  ${simplified_transformDataArray[i][2]}.toFixed(${simplified_transformDataArray[i][4]});`;
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
								e = `let ${simplified_transformDataArray[i][2]}`;
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
			case "ToString":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:String/Number/Boolean") {
							if (simplified_transformDataArray[i][3] !== true) {
								e = `let ${simplified_transformDataArray[i][2]}`;
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
			case "Replace":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:String") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Pattern:String") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						} else if (sourcePortPortID === "Target:String") {
							if (simplified_transformDataArray[i][7] === false) {
								e = `let ${simplified_transformDataArray[i][6]}`;
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
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "StartIndex:Number") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						} else if (sourcePortPortID === "Length:Number") {
							if (simplified_transformDataArray[i][7] === false) {
								e = `let ${simplified_transformDataArray[i][6]}`;
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
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "If:Boolean") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]}`;
								simplified_transformDataArray[i][5] = true;
							}
						} else if (sourcePortPortID === "Then:Boolean") {
							if (simplified_transformDataArray[i][7] === false) {
								e = `let ${simplified_transformDataArray[i][6]}`;
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
			case "Round":
			case "Floor":
			case "Ceiling":
			case "AbsoluteValue":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:Number") {
							if (simplified_transformDataArray[i][3] !== true) {
								e = `let ${simplified_transformDataArray[i][2]}`;
								simplified_transformDataArray[i][3] = true;
							}
						}
						f = arithmeticOperationPush2(simplified_transformDataArray[i], action);
					}
				}
				break;
		}
		if (e !== "") {
			inputDMCArray.push(e + ` = ${g};`);
		}
		if (f !== "") {
			inputDMCArray.push(f + "\n");
		}
	}

	function andOrActionPush(simpleArray: any[], action: {}): string {
		let f = "";
		if (simpleArray[5] === true && simpleArray[3] === true && simpleArray[7] !== true) {
			if (action === "OR") {
				f = `${simpleArray[6]} = ${simpleArray[2]}||${simpleArray[4]};`;
			} else if (action === "AND") {
				f = `${simpleArray[6]} = ${simpleArray[2]}&&${simpleArray[4]};`;
			}
			simpleArray[7] = true;
		}
		return f;
	}

	function arithmeticOperationPush1(simpleArray: any[], action: {}): string {
		let f = "";
		if (simpleArray[5] === true && simpleArray[3] === true && simpleArray[7] !== true) {
			switch (action) {
				case "Add":
					f = `${simpleArray[6]} = ${simpleArray[2]}+${simpleArray[4]};`;
					break;
				case "Multiply":
					f = `${simpleArray[6]} = ${simpleArray[2]}*${simpleArray[4]};`;
					break;
				case "Min":
					f = `${simpleArray[6]} = Math.min(${simpleArray[2]},${simpleArray[4]});`;
					break;
				case "Max":
					f = `${simpleArray[6]} = Math.max(${simpleArray[2]},${simpleArray[4]});`;
					break;
			}
			simpleArray[7] = true;
		}
		return f;
	}

	function arithmeticOperationPush2(simpleArray: any[], action: {}): string {
		let f = "";
		if (simpleArray[5] !== true && simpleArray[3] === true) {
			switch (action) {
				case "Round":
					f = `${simpleArray[4]} = Math.round(${simpleArray[2]});`;
					break;
				case "Floor":
					f = `${simpleArray[4]} = Math.floor(${simpleArray[2]});`;
					break;
				case "Ceiling":
					f = `${simpleArray[4]} = Math.ceil(${simpleArray[2]});`;
					break;
				case "AbsoluteValue":
					f = `${simpleArray[4]} = Math.abs(${simpleArray[2]});`;
					break;
			}
			simpleArray[5] = true;
		}
		return f;
	}

	function StringOperationPush1(simpleArray: any[], action: {}): string {
		let f = "";
		if (simpleArray[5] !== true && simpleArray[3] === true) {
			switch (action) {
				case "StringToBoolean":
					f = `${simpleArray[4]} = ${simpleArray[2]}.toString().toLowerCase() === true;`;
					break;
				case "StringToNumber":
					f = `${simpleArray[4]} = Number(${simpleArray[2]});`;
					break;
				case "Trim":
					f = `${simpleArray[4]} = ${simpleArray[2]}.toString().trim();`;
					break;
				case "StringLength":
					f = `${simpleArray[4]} = ${simpleArray[2]}.toString().length();`;
					break;
				case "ToLowerCase":
				case "ToUpperCase":
					f = `${simpleArray[4]} = ${simpleArray[2]}.toString().to${action}();`;
					break;
				case "Split":
					f = `${simpleArray[4]} = ${simpleArray[2]}.toString().split(" ");`;
					break;
			}
			simpleArray[5] = true;
		}
		return f;
	}

	function sourceEqualsTarget(targetPortPortID: {}, targetPortNodeID: {}, targetPortID: {}, sourcePortPortID: {}): string {
		let string = "";
		let action = targetPortNodeID;
		switch (action) {
			case "Split":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (trimTheStringUptoColon(targetPortPortID) === "Result1") {
							string = `${simplified_transformDataArray[i][4]}[0]`;
						} else if (trimTheStringUptoColon(targetPortPortID) === "Result2") {
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
			case "Add":
			case "Multiply":
			case "Max":
			case "Min":
			case "Subtract":
			case "Divide":
			case "SetPrecision":
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
			case "Round":
			case "Ceiling":
			case "Floor":
			case "AbsoluteValue":
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
			case "Input":
				for (let i in arrayInput) {
					if (arrayInput[i][1] === trimTheStringUptoColon(targetPortPortID)) {
						string = `${arrayInput[i][0]}`;
					}
				}
				break;
			default:
				string = `${targetPortNodeID}.${trimTheStringUptoColon(targetPortPortID)}`;
		}
		return string;
	}

	// Part 11 //
	
	for (let i in outputDMCArray) {
		let string = outputDMCArray[i];
		let string1 = string.substring(string.indexOf("=")+2, string.indexOf(";"));
		let string5 = string.substring(0, string.indexOf("=")-1);
		for (let j in inputDMCArray){
			let string2 = inputDMCArray[j];
			let string3 = string2.substring(0, string2.indexOf("=")-1);
			let string4 = string2.substring(string2.indexOf("=")+2, string2.indexOf(";"));
			if(string1 === string3){
				outputDMCArray[i] = string5 + " = " + string4 + ";";
				inputDMCArray[j] = " ";
			}
		}
	}

	for (let i in inputDMCArray) {
		console.log(inputDMCArray[i]);
	}

	const inputdmc = inputDMCArray.filter(j => j.length !== 0).join('\n');

	const outputdmc = outputDMCArray.join('\n');

	// === //

	let disposable = vscode.commands.registerCommand('dmc.helloWorld', () => {
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

export function deactivate() { }