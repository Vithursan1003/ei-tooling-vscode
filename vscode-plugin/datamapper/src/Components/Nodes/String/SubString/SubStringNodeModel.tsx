import { IntermediatePortModel } from "../../../Port/IntermediatePort/IntermediatePortModel";
import { CustomNodeModel } from "../../Customs/CustomNodeModel";

export class SubStringNodeModel extends CustomNodeModel {
    name: string;
    public inPort1!: IntermediatePortModel;
    public inPort2!: IntermediatePortModel;
    public inPort3!: IntermediatePortModel;
    public outPort!: IntermediatePortModel;
 
    constructor(options: any = {}) {
        super('sub-string-node',options.name);
        this.name = options.name;
    }

    inPort1Name = this.name ==='Replace'? 'IN : [STRING] ':'Value : [STRING] ';
    inPort2Name = this.name ==='Replace'? 'Target : [STRING] ':'Start : [NUMBER] ';
    inPort3Name = this.name ==='Replace'? 'ReplaceWith : [STRING] ':'Length : [NUMBER] ';

    initPorts(): void {
        this.inPort1 = new IntermediatePortModel(this.inPort1Name, "IN",true);
        this.addPort(this.inPort1);

        this.inPort2 = new IntermediatePortModel(this.inPort2Name, "IN",true);
        this.addPort(this.inPort2);

        this.inPort3 = new IntermediatePortModel(this.inPort3Name, "IN",true);
        this.addPort(this.inPort3);

        this.outPort = new IntermediatePortModel(' Result : [STRING]', "OUT",false);
        this.addPort(this.outPort);
    }
    
    initLinks(): void {}
}
