import createEngine, { DiagramModel, DefaultNodeModel, DefaultPortModel, BaseEvent } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import './test.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap/lib/InputGroup';
import MyButton from './Button';

export default function DataMapper() {
	//creating initial engine for the drag and drop UI
	const engine = createEngine();
	//calling diagram model to create the nodes
	var model = new DiagramModel();
	//setting the colour of the nodes
	const str = 'rgb(255,255,255)';

	const link: any[] = [];

	const [myArray, setMyArray] = useState<string[]>([]);

	// Add items to the array
	function addItem(item: string) {
		setMyArray((prevArray: any) => [...prevArray, item]);
	}

	const handleClick = () => {
		console.log(link);	
	};

	var node1 = new DefaultNodeModel("Input", str);
	node1.addPort(new DefaultPortModel(true, "name4", "name"));
	node1.addPort(new DefaultPortModel(false, "name5", "name"));
	node1.addPort(new DefaultPortModel(false, "name6", "name"));

	node1.setPosition(100, 100);

	var node2 = new DefaultNodeModel('Output', str);
	node2.addPort(new DefaultPortModel(true, 'name1', 'name'));
	node2.addPort(new DefaultPortModel(true, 'name2', 'name'));
	node2.addPort(new DefaultPortModel(true, 'name3', 'name'));
	//console.log(port1.getName());

	node2.setPosition(400, 100);

	model.addAll(node1, node2);
	engine.setModel(model);
	//console.log(model.getLinks());

	function timeout(delay: number) {
		return new Promise(res => setTimeout(res, delay));
	}

	model.registerListener({
		linksUpdated: async (event: BaseEvent) => {
			var data = event.link;
			await timeout(3000); //for 1 sec delay
			console.log(data);
			//addItem(data.sourcePort.getName().toString());
			//link.push( data.sourcePort.getName(), data.options.id );
			const newLink = {
				sourcePort: {
				  nodeId: data.sourcePort.parent.options.name,
				  portId: data.sourcePort.getName(),
				},
				targetPort: {
				  nodeId: data.targetPort.parent.options.name,
				  portId: data.targetPort.getName(),
				},
				linkId: data.options.id,
			  };
			  link.push(newLink);
		}
	});
	//const links = model.getLinks();
	//const id = engine.getModel() && engine.getModel().getID();

	return (
		<div className="container">
			<CanvasWidget className="canvas" engine={engine} />
			<MyButton onClick={handleClick} style={{ position: 'absolute', top: 10, left: 10 }} />
		</div>
	);
};