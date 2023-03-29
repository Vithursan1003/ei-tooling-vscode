import { LinkModel, PortModel, PortModelGenerics } from "@projectstorm/react-diagrams";
import { DataMapperLinkModel } from "../../Link/Model/DataMapperLinkModel";

export interface DataMapperNodeModelGenerics {
    PORT: DataMapperPortModel;
}


export default class DataMapperPortModel extends PortModel<PortModelGenerics & DataMapperNodeModelGenerics>  {
    linkedPorts: PortModel[];

    constructor(public portName: string, public portType: "IN" | "OUT",) {
        super({
            name: `${portName}`,
        });

        this.linkedPorts = [];
    }

    createLinkModel(): DataMapperLinkModel {
        const dm = new DataMapperLinkModel();
        return dm;
    }


    addLinkedPort(port: DataMapperPortModel): void {
        this.linkedPorts.push(port);
    }

    canLinkToPort(port: DataMapperPortModel): boolean {
        let isLinkExists = false;
        if (port.portType === "IN") {
			isLinkExists = this.linkedPorts.some((linkedPort) => {
				return port.getID() === linkedPort.getID()
			})
		}
        return this.portType !== port.portType && !isLinkExists;
    }
}
