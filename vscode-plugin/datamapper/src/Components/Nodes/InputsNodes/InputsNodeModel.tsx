import { IntermediatePortModel } from '../../Port/IntermediatePort/IntermediatePortModel';
import { CustomNodeModel } from '../Customs/CustomNodeModel';

export class InputsNodeModel extends CustomNodeModel {
    onClick: any;
    name: string;
    inPort1!: IntermediatePortModel;
  
    constructor(options: any = {}) {
        super('my-input-node',options.name);
        this.name = options.name || undefined;
        this.onClick = options.onClick || null;
    }

    initPorts(): void {
        this.inPort1 = new IntermediatePortModel("[NUMBER,STRING,BOOLEAN] ", "IN",'right');
        this.addPort(this.inPort1);
    }
    
    initLinks(): void {
        throw new Error('Method not implemented.');
    }

}