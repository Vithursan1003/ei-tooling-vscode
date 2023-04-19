import { LinkModel, PortModel, PortModelGenerics } from '@projectstorm/react-diagrams';
import { DataMapperLinkModel } from '../../Link/Model/DataMapperLinkModel';

export interface IntermediateNodeModelGenerics {
	PORT: IntermediatePortModel;
}
export const INT_PORT_TYPE_ID = "datamapper-intermediate-port";

export class IntermediatePortModel extends PortModel<PortModelGenerics & IntermediateNodeModelGenerics> {
	linkedPorts: IntermediatePortModel[] =[];

	constructor(
		public portId: string,
		public portType: "IN" | "OUT",
		public isIn : boolean) {
		super({
			type: INT_PORT_TYPE_ID,
			name: portId,
		});
	}

	createLinkModel(): DataMapperLinkModel {
		const lm = new DataMapperLinkModel();
		return lm;
	}

	canLinkToPort(port: IntermediatePortModel): boolean {
		return this.portType !== port.portType;
	}
	
	addLinkedPort(port: IntermediatePortModel): void {
        this.linkedPorts.push(port);
        port.linkedPorts.push(this);
    }
}

