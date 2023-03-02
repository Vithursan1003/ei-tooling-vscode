import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Upload from './FileUpload/Upload';

export default function Test(){
	const engine = createEngine();
	const model = new DiagramModel();

	const node1 = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	node1.addOutPort(<Upload title="Input"/>);
	node1.setPosition(300, 100);

	const node2 = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	node2.addInPort(<Upload title ="Output"/>);
	node2.setPosition(700, 100);

	model.addAll(node1, node2);

	engine.setModel(model);

	return (
		<div className='container'>
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};