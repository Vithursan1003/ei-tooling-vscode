import createEngine, {  DiagramModel, DefaultNodeModel, DefaultPortModel, PortModelAlignment, LabelModel, PortModel, PortWidget } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import './test.css';

export default function DataMapper() {
	//creating initial engine for the drag and drop UI
	const engine = createEngine();
	//calling diagram model to create the nodes
	var model = new DiagramModel();
	//setting the colour of the nodes
	const str = 'rgb(255,255,255)';

	var colour = 'rgb(255,255,255)';
	var node1 = new DefaultNodeModel("Input", str);
	node1.addPort(new DefaultPortModel(true, "name4", "name"));
	node1.addPort(new DefaultPortModel(false, "name5", "name"));
	node1.addPort(new DefaultPortModel(false, "name6", "name"));

	node1.setPosition(100, 100);

	var node2 = new DefaultNodeModel('Output', colour);
	node2.addPort(new DefaultPortModel(true, 'name1', 'name'));
	node2.addPort(new DefaultPortModel(true, 'name2', 'name'));
	node2.addPort(new DefaultPortModel(true, 'name3', 'name'));

	node2.setPosition(400, 100);

	model.addAll(node1, node2);
	engine.setModel(model);
	//console.log(model.getLinks());

	//const links = model.getLinks();
	const id = engine.getModel() && engine.getModel().getID();

	// model.registerListener({
	// 	nodesUpdated: e => console.log("nodesUpdated", e),
	// 	linksUpdated: e => console.log("linksUpdated", e),
		
	// 	// these are never triggered
	// 	zoomUpdated: e => console.log("zoomUpdated", e),
	// 	gridUpdated: e => console.log("gridUpdated", e),
	// 	offsetUpdated: e => console.log("offsetUpdated", e),
	// 	entityRemoved: e => console.log("entityRemoved", e),
	// 	selectionChanged: e => console.log("selectionChanged", e)
	// });


	return (
		<div className="container">
			<CanvasWidget className="canvas" engine={engine} />
		</div>
	);
};