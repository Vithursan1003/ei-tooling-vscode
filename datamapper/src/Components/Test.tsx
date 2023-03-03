import createEngine, { DiagramModel, DefaultPortModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
//import './test.css';
import SelectOption  from './SelectOption/SelectOption';

const myComponentStyle = {
	fontSize: '1px',
	alignItems: 'left',
	margin: 'auto',
 }

export default function Test(){
	const engine = createEngine();

	const model = new DiagramModel();

	const node1 = new DefaultNodeModel ('input', 'rgb(255,255,255)');
	node1.addOutPort(<SelectOption />);
	//Keep This part for later purposes
	//node1.addPort(new DefaultPortModel(false, 'out-1', 'Out thick'));
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel('Output', 'rgb(255,255,255)');
	node2.addInPort(<SelectOption />);
	//Keep This part for later purposes
	//node2.addPort(new DefaultPortModel(true, 'out-1', 'Out thick'));
	node2.setPosition(400, 100);

	model.addAll(node1, node2);

	engine.setModel(model);

	return (
		<div style={myComponentStyle}>
			<CanvasWidget  className="canvas" engine={engine} />
		</div>
	);
};
