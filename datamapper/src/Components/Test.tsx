import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import './test.css';
import UploadForm  from './FileUpload/UploadForm';

export default function Test(){
	const engine = createEngine();
	const model = new DiagramModel();

	const node1 = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	node1.addOutPort(<UploadForm />);
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	node2.addInPort(<UploadForm />);
	node2.setPosition(400, 100);

	model.addAll(node1, node2);

	engine.setModel(model);

	return (
		<div className='container'>
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};
