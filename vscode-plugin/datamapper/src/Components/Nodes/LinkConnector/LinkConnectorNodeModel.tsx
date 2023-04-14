import { IntermediatePortModel } from "../../Port/IntermediatePort/IntermediatePortModel";
import { CustomNodeModel } from "../Customs/CustomNodeModel";

export class LinkConnectorNodeModel extends CustomNodeModel {
    name: string;
    public inPort!: IntermediatePortModel;
    public outPort!: IntermediatePortModel;
 
    constructor(options: any = {}) {
        super('link-connector-node',options.name);
        this.name = options.name;
    }

    initPorts(): void {
        this.inPort = new IntermediatePortModel("Test1", "IN");
        this.addPort(this.inPort);

        this.outPort = new IntermediatePortModel('Test2', "OUT");
        this.addPort(this.outPort);
    }
    
    initLinks(): void {}
}
