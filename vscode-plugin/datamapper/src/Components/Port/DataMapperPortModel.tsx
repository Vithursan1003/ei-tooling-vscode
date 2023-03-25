import { LinkModel, PortModel, PortModelGenerics } from "@projectstorm/react-diagrams";
import { DataMapperLinkModel } from "../Link/Model/DataMapperLinkModel";

export interface DataMapperNodeModelGenerics {
    PORT: DataMapperPortModel;
}

interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

export default class DataMapperPortModel extends PortModel<PortModelGenerics & DataMapperNodeModelGenerics>  {
    linkedPorts: PortModel[];

    constructor(public portName: string, public portType: "IN" | "OUT",) {
        super({
            name: `${portName}`,
        });

        this.linkedPorts = [];

        // this.registerListener({
        //     selectionChanged: () => {
        //         console.log("port selection");
        //     },
        // });
    }

    createLinkModel(): LinkModel {
        const dm = new DataMapperLinkModel();
        return dm;
    }


    addLinkedPort(port: PortModel): void {
        this.linkedPorts.push(port);
    }

    canLinkToPort(port: DataMapperPortModel): boolean {
        return this.portType !== port.portType;
    }
}
