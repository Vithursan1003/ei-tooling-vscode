import createEngine, { DiagramModel, DefaultNodeModel, DefaultPortModel, PortModelAlignment, LabelModel, PortModel, PortWidget } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Upload from './FileUpload/Upload';
import './test.css';
import CreateRootNode from './CreateRoot/CreateRootNode';
import UploadForm from './FileUpload/UploadForm';

interface Props {
	title: string;
  }

// Form Line 11 to Line 71, when we uncomment the classes and initiate the nodes as in Line 88 to Line 94
// And including the nodes in model in line 102,
// Then the errors come saying that the factory is not registered for the node type.

// class MyNodeModel1 extends DefaultNodeModel {
// 	label: LabelModel;

// 	constructor(options: any = {}) {
// 	  super({
// 		...options,
// 		//type: 'my-node-model',
// 	  });

// 	this.label = new LabelModel({
// 		label: 'My Label',
// 		offsetY: -23,
// 		style: {
// 		//   fontSize: 12,
// 		//   fontWeight: 'bold',
// 		  color: 'red',
// 		},
// 	  });
// 	}
//   }

  class MyNodeModel extends DefaultNodeModel {
	constructor(options = {}) {
	  super({
		...options,
		type: 'my-node',
	  });

	  // Create a new PortModel for the button
	  const buttonPort = new PortModel({
		in: false,
		name: 'button',
		alignment: PortModelAlignment.RIGHT,
		label: <button>Click me</button>,
	  });

	  // Add the button port to the node
	  this.addPort(buttonPort);
	}
  }

// export class CustomNodeModel extends DefaultNodeModel {
// 	constructor() {
// 		super({
// 			type: 'custom-node',
// 			name: 'Custom Node',
// 		});
// 	}

// 	// Override the `getPort` method to create a new port widget with a button component
// 	addPort(port: any) {
// 		return (
// 			<div key={port.id}>
// 				<div style={{ position: 'absolute', left: '-30px', top: '-5px' }}>
// 					<button onClick={() => console.log('Button clicked')}>Click me</button>
// 				</div>
// 				<PortWidget port={port} />
// 			</div>
// 		);
// 	}
// }
export default function DataMapper() {
	//creating initial engine for the drag and drop UI
	const engine = createEngine();
	//calling diagram model to create the nodes
	const model = new DiagramModel();
	//setting the colour of the nodes
	const str = 'rgb(255,255,255)';
	//const strColor = str.replace(/\d+/, match => `<span style="color: red">${match} </span>`);

	const testFunc = (testData: any) => {
		console.log('test', testData);
	};

	var colour = 'rgb(255,255,255)';
	const node1 = new DefaultNodeModel("Input", str);
	node1.addOutPort(<Upload title="Input" someFunction={testFunc}/>);
	node1.addOutPort(<CreateRootNode />);
	//node1.addPort(new DefaultPortModel(false,"name","name"));
	node1.setPosition(100, 100);

	const node3 = new MyNodeModel({
		name: 'My Node',
	  });

	// const node4 = new CustomNodeModel({
	// 	name: 'My Node',
	//   });

	const node2 = new DefaultNodeModel('Output', colour);
	node2.addInPort(<Upload title="Output" />);
	node2.addInPort(<CreateRootNode />);
	node2.setPosition(400, 100);

	model.addAll(node1, node2);
	engine.setModel(model);

	return (
		<div className="container">
			<CanvasWidget className="canvas" engine={engine} />
		</div>
	);
};