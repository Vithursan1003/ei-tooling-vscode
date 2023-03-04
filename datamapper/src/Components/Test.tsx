import createEngine, { DiagramModel, DefaultNodeModel, DefaultPortModel, PortModelAlignment} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Upload from './FileUpload/Upload';
import './test.css';
import CreateRootNode from './CreateRoot/CreateRootNode';

export default function Test(){
	//creating initial engine for the drag and drop UI
	const engine = createEngine();
	// register some other factories as well

	//calling diagram model to create the nodes
	const model = new DiagramModel();
	//setting the colour of the nodes
	var colour = 'rgb(255,255,255)';

	const node1 = new DefaultNodeModel('', colour);
	node1.addOutPort(<Upload title="Input"/>);
	node1.addOutPort(<CreateRootNode/>);
	//node1.addPort(new DefaultPortModel(false,"name","name"));
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel('Output', colour);
	node2.addInPort(<Upload title ="Output"/>);
	node2.addInPort(<CreateRootNode/>);
	node2.setPosition(400, 100);

	model.addAll(node1, node2);
	engine.setModel(model);

	return (
		<div className="container">
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};