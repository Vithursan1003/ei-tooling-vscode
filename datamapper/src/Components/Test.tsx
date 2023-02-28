import * as React from 'react';
import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DefaultState } from './DefaultState';
import './test.css';

export default () => {
	const engine = createEngine();
	const model = new DiagramModel();

	const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
	node1.addOutPort('Input');
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	node2.addInPort('Output');
	node2.setPosition(400, 100);

	model.addAll(node1, node2);

	engine.setModel(model);

	// Use this custom "DefaultState" instead of the actual default state we get with the engine
	engine.getStateMachine().pushState(new DefaultState());

	return (
		<>
			<CanvasWidget className="canvas" engine={engine} />
		</>
	);
};
