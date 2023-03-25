import { CustomNodeModel } from '../Customs/CustomNodeModel';

export class InputsNodeModel extends CustomNodeModel {

    onClick: any;
    name: any;
  
    constructor(options: any = {}) {
        super({
            ...options,
            type: 'my-custom-node',
        });

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