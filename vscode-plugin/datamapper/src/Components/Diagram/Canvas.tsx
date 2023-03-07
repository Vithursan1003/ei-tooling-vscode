import createEngine, { DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { canvastyles } from './styles';
import Upload from './../FileUpload/Upload';
import { InputsNodeModel } from './../Nodes/InputsNodeModel';
import { Add } from '@mui/icons-material';
import { InputsNodeFactory } from './../Nodes/InputsNodeFactory';


export default function Canvas(){

	const classes = canvastyles();
	const engine = createEngine();
	engine.getNodeFactories().registerFactory(new InputsNodeFactory());
	const model = new DiagramModel();

	const Input = new DefaultNodeModel('Input', 'rgb(0,192,255)');
	Input.addOutPort(<Upload title="Input"/>);
	Input.setPosition(100, 100);

	const Output = new DefaultNodeModel('Output', 'rgb(192,255,0)');
	Output.addInPort(<Upload title ="Output"/>);
	Output.setPosition(400, 100);

	const Custom = new InputsNodeModel({
		name : 'Custom',
		color : 'Blue',
		icon : <Add/>,
		onClick : ()=>{
			console.log("hi");
		},
		element : <Upload title='Input'/>
	})


	model.addAll(Input,Output,Custom);
	engine.setModel(model);

	return (
		<div>
			<CanvasWidget  className={classes.canvas} engine={engine} />
		</div>
	);
};