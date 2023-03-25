import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { CustomNodeFactoryInterface } from "../Customs/CustomNodeModel";
import { InputsNodeModel } from "./InputsNodeModel";
import { InputsNodeWidget } from "./InputsNodeWidget";

export class InputsNodeFactory extends AbstractReactFactory<InputsNodeModel, DiagramEngine> implements CustomNodeFactoryInterface {
	constructor() {
		super("my-custom-node");
	}

	generateModel(event: any) :InputsNodeModel {
		return new InputsNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <InputsNodeWidget node={event.model} />;
	}
}
