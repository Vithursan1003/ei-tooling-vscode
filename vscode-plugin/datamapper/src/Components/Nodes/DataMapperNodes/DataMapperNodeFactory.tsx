import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DataMapperNodeModel } from "./DataMapperNodeModel";
import { DataMapperNodeWidget } from "./DataMapperNodeWidget";

export class DataMapperNodeFactory extends AbstractReactFactory<DataMapperNodeModel, DiagramEngine> {
	constructor() {
		super("my-custom-node");
	}

	generateModel(event: any) :DataMapperNodeModel {
		return new DataMapperNodeModel(event.schema);
	}

	generateReactWidget(event: any): JSX.Element {
		return <DataMapperNodeWidget engine={this.engine} node={event.model} />;
	}
}
