import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { canvastyles } from './styles';
import Upload from './../FileUpload/Upload';

export default function Canvas(){

	const classes = canvastyles();
	const engine = createEngine();
	const model = new DiagramModel();

	const Input = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	Input.addOutPort(<Upload/>);
	Input.setPosition(100, 100);

	const Output = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	Output.addInPort(<Upload/>);
	Output.setPosition(400, 100);

	model.addAll(Input,Output);
	engine.setModel(model);

	return (
		<div>
			<CanvasWidget  className={classes.canvas} engine={engine} />
		</div>
	);
};