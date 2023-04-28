import { PortModel, PortModelGenerics } from "@projectstorm/react-diagrams";
import { DataMapperLinkModel } from "../../Link/Model/DataMapperLinkModel";
import { IntermediatePortModel } from './../IntermediatePort/IntermediatePortModel';

export interface DataMapperNodeModelGenerics {
    PORT: DataMapperPortModel;
}

export default class DataMapperPortModel extends PortModel<PortModelGenerics & DataMapperNodeModelGenerics>  {
    linkedPorts: DataMapperPortModel[] =[];
   
    constructor(
        public portName: string,
        public portType: "IN" | "OUT",
        public alignment : string,
        public parentModel?: DataMapperPortModel,
        public collapsed?: boolean,
        public hidden?: boolean,
        public descendantHasValue?: boolean,
        public ancestorHasValue?: boolean) {
        super({
            name: `${portName}`,
            type: 'my-datamapper-port',
        });
    }

    getPortType(): string {
        return this.portType;
    }

    createLinkModel(): DataMapperLinkModel {
        const dm = new DataMapperLinkModel();
        return dm;
    }

    addLinkedPort(port: DataMapperPortModel): void {
        this.linkedPorts.push(port);
        port.linkedPorts.push(this);
        console.log("linked ports array updated");
    }

    setDescendantHasValue(): void {
        this.descendantHasValue = true;
        if (this.parentModel) {
            this.parentModel.setDescendantHasValue();
        }
    }

    isDisabled(): boolean | undefined {
        return this.ancestorHasValue || this.descendantHasValue
    }

    isLinkedTo(port: DataMapperPortModel): boolean {
        console.log("Linked ports in port model: ",this.linkedPorts);
        return this.linkedPorts.some((linkedPort) => linkedPort.getID() === port.getID());
    }

    canLinkToPort(port: DataMapperPortModel): boolean {
        return ((this.portType !== port.portType) && !this.isLinkedTo(port) &&  (port instanceof IntermediatePortModel || (!port.isDisabled())) );
    }

    

}
