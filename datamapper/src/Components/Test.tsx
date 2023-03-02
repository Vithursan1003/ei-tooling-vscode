import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Upload from './FileUpload/Upload';
import './test.css';
import CreateRootNode from './CreateRoot/CreateRootNode';

export default function Test(){
	const engine = createEngine();
	const model = new DiagramModel();

	const node1 = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	node1.addOutPort(<Upload title="Input"/>);
	node1.addOutPort(<CreateRootNode/>);
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	node2.addInPort(<Upload title ="Output"/>);
	node2.addInPort(<CreateRootNode/>);
	node2.setPosition(400, 100);

	model.addAll(node1, node2);
	engine.setModel(model);

	return (
		<div className='container'>
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};