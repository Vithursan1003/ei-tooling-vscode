import { PortModel, PortModelGenerics } from "@projectstorm/react-diagrams";

export interface RecordNodeModelGenerics {
	PORT: RecordPortModel;
}

export default class RecordPortModel extends PortModel<PortModelGenerics & RecordNodeModelGenerics>{
    active: boolean;

    constructor(public portName: string, public portType: "IN" | "OUT",) {
        super({
            name: `${portName}`,
        })   
        this.active = false;   
    }

    setActive(active: boolean) {
        this.active =active;
    }

    canLinkToPort(port: RecordPortModel): boolean {
        return this.portType !== port.portType;
    }
}
