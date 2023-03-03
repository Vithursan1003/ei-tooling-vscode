import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Upload from './FileUpload/Upload';
import CreateRootNode from './CreateRoot/CreateRootNode';

export default function Diagram(){
	const engine = createEngine();
	const model = new DiagramModel();

	const Input = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	Input.addOutPort(<Upload title="Input"/>);
	Input.addOutPort(<CreateRootNode/>);
	Input.setPosition(100, 100);

	const Output = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	Output.addInPort(<Upload title ="Output"/>);
	Output.addInPort(<CreateRootNode/>);
	Output.setPosition(400, 100);

	model.addAll(Input,Output);
	engine.setModel(model);

	return (
		<div className='container'>
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};