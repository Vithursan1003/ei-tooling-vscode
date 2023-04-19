/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

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

export function activate(context: vscode.ExtensionContext) {

	const newLink = [
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "fullName:string",
				"ID": "f00ba244-c1da-4db9-baf3-5a56095d5727",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Split",
				"portId": "Value:String",
				"ID": "4ccf3ea6-bba2-40c1-9128-8277a85078a2",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Split",
				"portId": "Result1:String",
				"ID": "4ccf3ea6-bba2-40c1-9128-8277a85078a2",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Concat",
				"portId": "Value1:String",
				"ID": "395f3b33-d39d-44e5-8e34-77a60a1c1cd7",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Split",
				"portId": "Result2:String",
				"ID": "4ccf3ea6-bba2-40c1-9128-8277a85078a2",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Concat",
				"portId": "Value2:String",
				"ID": "395f3b33-d39d-44e5-8e34-77a60a1c1cd7",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Concat",
				"portId": "Result:String",
				"ID": "395f3b33-d39d-44e5-8e34-77a60a1c1cd7",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "UpperCase",
				"portId": "Value:String",
				"ID": "829cc589-9451-4e31-84ee-6c54a273d2ad",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "UpperCase",
				"portId": "Result:String",
				"ID": "829cc589-9451-4e31-84ee-6c54a273d2ad",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "firstName:string",
				"ID": "ed83bfe0-8dcd-4d9a-866d-20cb64c7b050",
				"alignment": "left"
			},
			"isChecked": false
		}
	];

	const transformedData: DataModel[] = newLink;

	// === //

	let inputID: {} = {};

	for (let i in transformedData) {
		if (transformedData[i].sourcePort.nodeId === "Input") {
			inputID = transformedData[i].sourcePort.ID;
		} else if (transformedData[i].targetPort.nodeId === "Input") {
			inputID = transformedData[i].targetPort.ID;
		}
	}

	// === //

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

	function createArray(outputJSON: any, string1: string) {
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

		function includePropToArray(JSONobject: any, array: any[], prop: any, k: any) {
			array[k] = prop;
			const str: string = array.join(".");
			if (string1 === "output") {
				dmcArray.push([str, prop, false]);
			} else if (string1 === "input") {
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

	function checkTransformDataArray(actionnode: any, actionID: any, b: any) {
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

	function pushToTransformDataArray(actionnode: any, actionID: any, i: any) {
		let e = [];
		switch (actionnode) {
			case "Split":
				e[0] = actionnode;
				e[1] = actionID;
				e[2] = `Split_${i + 1}_Input`;
				e[3] = false;
				e[4] = `Split_${i + 1}_Output`;
				e[5] = false;
				break;
			case "Concat":
				e[0] = actionnode;
				e[1] = actionID;
				e[2] = `Concat_${i + 1}_0`;
				e[3] = false;
				e[4] = `Concat_${i + 1}_1`;
				e[5] = false;
				e[6] = `Concat_${i + 1}_Output`;
				e[7] = false;
				break;
			case "UpperCase":
				e[0] = actionnode;
				e[1] = actionID;
				e[2] = `UpperCase_${i + 1}_Input`;
				e[3] = false;
				e[4] = `UpperCase_${i + 1}_Output`;
				e[5] = false;
				break;
		}
		return e;
	}

	let simplified_transformDataArray = transformDataArray.filter(j => j.length !== 0);

	let simplified_inputQueueArray1 = inputQueueArray1.filter(j => j[0] !== "undefined");

	// === //

	//Below code is to list outputs connected with actions involved in the data mapping
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

	function outputDMC(sourcePortNodeID: {}, sourcePortPortID: {}, targetPortNodeID: {}, targetPortPortID: {}, targetPortID: {}) {
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
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						e = simplified_transformDataArray[i][6];
					}
				}
				break;
			case "UpperCase":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						e = simplified_transformDataArray[i][4];
					}
				}
				break;
			default:
				e = targetPortNodeID + "." + trimTheStringUptoColon(targetPortPortID);
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

	let inputDMCArray: string[] = [];

	for (let z in simplified_inputQueueArray1) {
		for (let j in inputObjectArray) {
			if (inputObjectArray[j].sourcePort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].sourcePort.alignment === "right") {
				inputDmcPush(inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID, inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID);
			} else if (inputObjectArray[j].targetPort.nodeId === simplified_inputQueueArray1[z][0] && inputObjectArray[j].targetPort.alignment === "right") {
				inputDmcPush(inputObjectArray[j].sourcePort.nodeId, inputObjectArray[j].sourcePort.portId, inputObjectArray[j].targetPort.ID, inputObjectArray[j].targetPort.nodeId, inputObjectArray[j].targetPort.portId, inputObjectArray[j].sourcePort.ID);
			}
		}
		//inputQueueProgressPush(simplified_inputQueue[z][1]);
	}

	function inputDmcPush(sourcePortNodeID: {}, sourcePortPortID: {}, sourcePortID: {}, targetPortNodeID: {}, targetPortPortID: {}, targetPortID: {}) {
		let e: string = "";
		let f: string = "";
		let g: string = sourceEqualsTarget(targetPortPortID, targetPortNodeID, sourcePortID, sourcePortPortID);
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
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value1:String") {
							if (simplified_transformDataArray[i][3] === false) {
								e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
								simplified_transformDataArray[i][3] = true;
							}
						} else if (sourcePortPortID === "Value2:String") {
							if (simplified_transformDataArray[i][5] === false) {
								e = `let ${simplified_transformDataArray[i][4]} =  ${g};`;
								simplified_transformDataArray[i][5] = true;
							}
						}
						if (simplified_transformDataArray[i][5] === true && simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][7] !== true) {
							f = `${simplified_transformDataArray[i][6]} = ${simplified_transformDataArray[i][2]}.toString().concat(${simplified_transformDataArray[i][4]}.toString());`;
							simplified_transformDataArray[i][7] = true;
						}
					}
				}
				break;
			case "UpperCase":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (sourcePortPortID === "Value:String") {
							if (simplified_transformDataArray[i][3] !== true) {
								e = `let ${simplified_transformDataArray[i][2]} =  ${g};`;
								simplified_transformDataArray[i][3] = true;
							}
						}
						if (simplified_transformDataArray[i][3] === true && simplified_transformDataArray[i][5] !== true) {
							f = `${simplified_transformDataArray[i][4]} = ${simplified_transformDataArray[i][2]}.toString().UpperCase();`;
							simplified_transformDataArray[i][5] = true;
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

	function sourceEqualsTarget(targetPortPortID: {}, targetPortNodeID: {}, targetPortID: {}, sourcePortPortID: {}) {
		let string = "";
		let action = targetPortNodeID;
		switch (action) {
			case "Split":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (trimTheStringUptoColon(sourcePortPortID) === "Value1") {
							string = `${simplified_transformDataArray[i][4]}[0]`;
						} else if (trimTheStringUptoColon(sourcePortPortID) === "Value2") {
							string = `${simplified_transformDataArray[i][4]}[1]`;
						}
					}
				}
				break;
			case "Concat":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						string = `${simplified_transformDataArray[i][6]}`;
					}
				}
				break;
			case "UpperCase":
				// if (simplified_transformDataArray[i][1] === targetPortID){
				// 	string = `${simplified_transformDataArray[i][4]};`;
				// }
				break;
			default:
				string = `${targetPortNodeID}.${trimTheStringUptoColon(targetPortPortID)}`;
		}
		return string;
	}

	const inputdmc = inputDMCArray.filter(j => j.length !== 0).join('\n');

	// === //

	function trimTheStringUptoColon(str: {}) {
		let str1 = str.toString();
		return str1.substring(0, str1.indexOf(":"));
	}

	let disposable = vscode.commands.registerCommand('hidmc.helloWorld', async () => {
		//later codes
		const myArray = [];
		const fileName = 'newFile1.dmc';
		const filePath = 'C:/Users/WSO2/' + fileName;
		myArray[0] = "map_S_" + Input.title + "_S_" + Output.title + " = function(){ \n";
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

// This method is called when your extension is deactivated
export function deactivate() { }
