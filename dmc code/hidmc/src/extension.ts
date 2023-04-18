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

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const newLink = [
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "fullName:string",
				"ID": "c1165718-2a6c-4110-94a9-358bf3dbfb63",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Split",
				"portId": "Value:String",
				"ID": "5be088c5-1c7f-4d28-9079-e95bb609ac84",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "address1:string",
				"ID": "c1165718-2a6c-4110-94a9-358bf3dbfb63",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Concat",
				"portId": "Value1:String",
				"ID": "66488ad8-ee86-48b9-bc9a-f359a6cb9b3b",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "address2:string",
				"ID": "c1165718-2a6c-4110-94a9-358bf3dbfb63",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Concat",
				"portId": "Value2:String",
				"ID": "66488ad8-ee86-48b9-bc9a-f359a6cb9b3b",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Input",
				"portId": "age:string",
				"ID": "c1165718-2a6c-4110-94a9-358bf3dbfb63",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "age:string",
				"ID": "100e1957-beea-406b-912d-5e19fd56f017",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Concat",
				"portId": "Result:String",
				"ID": "66488ad8-ee86-48b9-bc9a-f359a6cb9b3b",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "address:string",
				"ID": "100e1957-beea-406b-912d-5e19fd56f017",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Split",
				"portId": "Result1:String",
				"ID": "5be088c5-1c7f-4d28-9079-e95bb609ac84",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "firstName:string",
				"ID": "100e1957-beea-406b-912d-5e19fd56f017",
				"alignment": "left"
			},
			"isChecked": false
		},
		{
			"sourcePort": {
				"nodeId": "Split",
				"portId": "Result2:String",
				"ID": "5be088c5-1c7f-4d28-9079-e95bb609ac84",
				"alignment": "right"
			},
			"targetPort": {
				"nodeId": "Output",
				"portId": "lastName:string",
				"ID": "100e1957-beea-406b-912d-5e19fd56f017",
				"alignment": "left"
			},
			"isChecked": false
		}
	];

	//line 121 to 184 is to list actions involved in the data mapping

	const transformedData: DataModel[] = newLink;
	//console.log(transformedData);

	let transformDataArray: any[][] = [];
	let b = 0;
	let actionnode: {}, actionID: {};
	for (let i in transformedData) {
		if (!(transformedData[i].sourcePort.nodeId === "Input" && transformedData[i].targetPort.nodeId === "Output") || (transformedData[i].sourcePort.nodeId === "Output" && transformedData[i].targetPort.nodeId === "Input")) {
			if (transformedData[i].sourcePort.nodeId === "Input" || transformedData[i].sourcePort.nodeId === "Output") {
				actionnode = transformedData[i].targetPort.nodeId;
				actionID = transformedData[i].targetPort.ID;
				let data = checkTransformDataArray(transformedData, actionnode, actionID, i, b);
				if (data) {
					transformDataArray.push(data);
					b++;
				}
			} else if (transformedData[i].targetPort.nodeId === "Input" || transformedData[i].targetPort.nodeId === "Output") {
				actionnode = transformedData[i].sourcePort.nodeId;
				actionID = transformedData[i].sourcePort.ID;
				let data = checkTransformDataArray(transformedData, actionnode, actionID, i, b);
				if (data) {
					transformDataArray.push(data);
					b++;
				}
			}
		}
	}

	function checkTransformDataArray(transformedData: any, actionnode: any, actionID: any, i: any, b: any) {
		let c = 0;
		let d: any = [];
		for (let p = 0; p < i; p++) {
			if ((transformedData[p].targetPort.nodeId === actionnode || transformedData[p].sourcePort.nodeId === actionnode)) {
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
				e[2] = `split_${i + 1}_Input`;
				e[3] = false;
				e[4] = `split_${i + 1}_Output`;
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
		}
		return e;
	}

	let simplified_transformDataArray = transformDataArray.filter(j => j.length !== 0);

	//Below code is to list outputs connected with actions involved in the data mapping
	let outputObjectArray = transformedData.filter(j => j.targetPort.nodeId === "Output" || j.sourcePort.nodeId === "Output");
	//console.log(outputObjectArray);

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
		let action = targetPortNodeID;
		switch (action) {
			case "Split":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						if (targetPortPortID === "Result1:String") {
							e = "output." + sourcePortPortID + " = " + simplified_transformDataArray[i][2] + "[0];";
						} else if (targetPortPortID === "Result2:String") {
							e = "output." + sourcePortPortID + " = " + simplified_transformDataArray[i][2] + "[1];";
						}
					}
				}
				break;
			case "Concat":
				for (let i in simplified_transformDataArray) {
					if (simplified_transformDataArray[i][1] === targetPortID) {
						e = "output." + sourcePortPortID + " = " + simplified_transformDataArray[i][6] + ";";
					}
				}
				break;
		}
		return e;
	}

	const outputdmc = outputDMCArray.join('\n');
	//console.log(outputdmc);

	//Below code is to list list inputs connected with actions involved in the data mapping

	let inputObjectArray = transformedData.filter(j => j.targetPort.nodeId !== "Output" && j.sourcePort.nodeId !== "Output");

	let inputDMCArray: string[] = [];
	let inputQueue: string[][] = [];
	let i = 0, c = 1;
	inputQueue.push(["Input", "1"]);

	while (i < inputQueue.length){
		inputQueuePush(inputQueue[i][0]);
		console.log(inputQueue[i][0]);
		i++;
	}


	function inputQueuePush(nodeID: {}) {
		for (let j in inputObjectArray) {
			if (inputObjectArray[j].sourcePort.nodeId === nodeID && inputObjectArray[j].sourcePort.alignment === "right") {
				inputQueue.push([inputObjectArray[j].targetPort.nodeId.toString(), inputObjectArray[j].targetPort.ID.toString()]);
			} else if (inputObjectArray[j].targetPort.nodeId === nodeID && inputObjectArray[j].targetPort.alignment === "right") {
				inputQueue.push([inputObjectArray[j].sourcePort.nodeId.toString(), inputObjectArray[j].sourcePort.ID.toString()]);
			}
		}
	}

	function checkInputQueue(actionID: {}) {
		for (let i in inputQueue) {
			if (inputQueue[i][1] === actionID) {
				return true;
			}
		}
		return false;
	}

	console.log("inputqueue\n");
	for (let i in inputQueue) {
		console.log(inputQueue[i]);
	}

	//code above this line
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "hivithu" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hidmc.helloWorld', async () => {
		//later codes
		const myArray = [];
		const fileName = 'newFile1.dmc';
		const filePath = 'C:/Users/WSO2/' + fileName;
		myArray[0] = "map_S_" + "Input" + "_S_" + "Output" + " = function(){ ";
		//myArray[1] = inputdmc;
		//myArray[2] = processdmc;
		//myArray[3] = inputActiondmc;
		//myArray[4] = processActiondmc;
		myArray[1] = outputdmc;
		myArray.push("return Output;\n}");
		const content = myArray.join('\n\n');

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