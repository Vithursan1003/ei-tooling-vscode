import { DefaultPortModel } from "@projectstorm/react-diagrams";

export interface RecordNodeModelGenerics {
    PORT: RecordPortModel;
}

export default class RecordPortModel extends DefaultPortModel {

    constructor(public portName: string, public portType: "IN" | "OUT",) {
        super({
            name: `${portName}`,
        });
    }

    canLinkToPort(port: RecordPortModel): boolean {
        return this.portType !== port.portType;
    }
}
