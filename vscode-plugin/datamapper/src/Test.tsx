import createEngine, { DiagramModel, DefaultNodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { JoinNodeModel } from './Components/Nodes/String/Join/JoinNodeModel';
import { JoinNodeFactory } from './Components/Nodes/String/Join/JoinNodeFactory';
import './Test.css';
import DataMapperPortModel from './Components/Port/DataMapperPort/DataMapperPortModel';
import { DataMapperPortFactory } from './Components/Port/DataMapperPort/DataMapperPortFactory';
import { LinkConnectorNodeModel } from './Components/Nodes/LinkConnector/LinkConnectorNodeModel';
import { LinkConnectorNodeFactory } from './Components/Nodes/LinkConnector/LinkConnectorNodeFactory';
import { InputsNodeFactory } from './Components/Nodes/InputsNodes/InputsNodeFactory';
import { InputsNodeModel } from './Components/Nodes/InputsNodes/InputsNodeModel';

export default function Test() {
	//creating initial engine for the drag and drop UI
	const engine = createEngine();
    engine.getNodeFactories().registerFactory(new JoinNodeFactory());
	engine.getNodeFactories().registerFactory(new LinkConnectorNodeFactory());
    engine.getPortFactories().registerFactory(new DataMapperPortFactory());
	//calling diagram model to create the nodes
	var model = new DiagramModel();
	//setting the colour of the nodes
	const str = 'rgb(255,255,255)';

	const link: any[] = [];

	
	var node1 = new InputsNodeModel("Input");
    // node1.addPort(new DataMapperPortModel("Port 1","IN"));
    // node1.addPort(new DataMapperPortModel("Port 2","OUT"));
	node1.addPort(new DefaultPortModel(true, "name4", "name"));
	node1.addPort(new DefaultPortModel(false, "name5", "name"));
	node1.addPort(new DefaultPortModel(false, "name6", "name"));

	node1.setPosition(100, 100);

	var node2 = new LinkConnectorNodeModel({name:'Concat'});
    node2.addPort(new DataMapperPortModel("Port 1","IN"));
    node2.addPort(new DataMapperPortModel("Port 1","OUT"));

	node2.setPosition(400, 100);

	model.addAll(node1,node2);
	engine.setModel(model);
	console.log(model.getNodes());

	return (
		<div className="container">
			<CanvasWidget className="canvas" engine={engine} />
		</div>
	);
};