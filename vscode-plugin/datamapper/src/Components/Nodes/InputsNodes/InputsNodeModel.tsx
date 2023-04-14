import { CustomNodeModel } from '../Customs/CustomNodeModel';

export class InputsNodeModel extends CustomNodeModel {
    onClick: any;
    name: string;
  
    constructor(options: any = {}) {
        super('my-input-node',options.name);
        this.name = options.name || undefined;
        this.onClick = options.onClick || null;
    }

    initPorts(): void {
        throw new Error('Method not implemented.');
    }
    initLinks(): void {
        throw new Error('Method not implemented.');
    }

}