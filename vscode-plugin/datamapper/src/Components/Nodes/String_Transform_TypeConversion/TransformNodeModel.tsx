import { IntermediatePortModel } from "../../Port/IntermediatePort/IntermediatePortModel";
import { CustomNodeModel } from "../Customs/CustomNodeModel";

export class TransformNodeModel extends CustomNodeModel {
    name: string;
    public inPort!: IntermediatePortModel;
    public outPort!: IntermediatePortModel;
 
    constructor(options: any = {}) {
        super('transform-node',options.name);
        this.name = options.name;
    }

    inPortName = this.name === 'ToString' ?"IN : [BOOL/NUM] ": "IN : [STRING] ";

    initPorts(): void {
        this.inPort = new IntermediatePortModel(this.inPortName, "IN",'right');
        this.addPort(this.inPort);

        this.outPort = new IntermediatePortModel(' Result : [STRING]', "OUT",'left');
        this.addPort(this.outPort);
    }
    
    initLinks(): void {}
}
