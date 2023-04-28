import { IntermediatePortModel } from "../../Port/IntermediatePort/IntermediatePortModel";
import { CustomNodeModel } from "../Customs/CustomNodeModel";

export class JoinNodeModel extends CustomNodeModel {
    name: string;
    public inPort1!: IntermediatePortModel;
    public inPort2!: IntermediatePortModel;
    public outPort!: IntermediatePortModel;
 
    constructor(options: any = {}) {
        super('join-node',options.name);
        this.name = options.name;
    }

    initPorts(): void {
        this.inPort1 = new IntermediatePortModel("IN_1 : [STRING] ", "IN",'right');
        this.addPort(this.inPort1);

        this.inPort2 = new IntermediatePortModel("IN_2 : [STRING] ", "IN",'right');
        this.addPort(this.inPort2);

        this.outPort = new IntermediatePortModel(' Result : [STRING]', "OUT",'left');
        this.addPort(this.outPort);
    }
    
    initLinks(): void {}
}
