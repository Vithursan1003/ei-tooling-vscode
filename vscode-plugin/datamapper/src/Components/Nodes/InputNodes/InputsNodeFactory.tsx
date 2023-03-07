import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { InputsNodeModel } from "./InputsNodeModel";
import { InputsNodeWidget } from "./InputsNodeWidget";

export class InputsNodeFactory extends AbstractReactFactory<InputsNodeModel, DiagramEngine> {
	constructor() {
		super("my-custom-node");
	}

	generateModel(event: any) {
		return new InputsNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <InputsNodeWidget engine={this.engine} node={event.model} />;
	}
}
