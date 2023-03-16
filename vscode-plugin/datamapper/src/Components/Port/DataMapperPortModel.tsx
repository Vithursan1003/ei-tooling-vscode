import { PortModel, PortModelGenerics } from "@projectstorm/react-diagrams";

export interface DataMapperNodeModelGenerics {
    PORT: DataMapperPortModel;
}

interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

export default class DataMapperPortModel extends PortModel<PortModelGenerics & DataMapperNodeModelGenerics>  {

    constructor(public portName: string, public portType: "IN" | "OUT",) {
        super({
            name: `${portName}`,
        });

        this.registerListener({
            selectionChanged: () => {
                vscode.postMessage({ command: 'fail_alert', text:`Port ${this.getName()} selected: ${this.isSelected()}`});
            },
        });
    }

    canLinkToPort(port: DataMapperPortModel): boolean {
        return this.portType !== port.portType;
    }
}
