import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { CustomNodeModel } from '../Customs/CustomNodeModel';

export class InputsNodeModel extends CustomNodeModel {

    icon: any;
    onClick: any;
    name: any;
    color: any;

    
    constructor(options: any = {}) {
        super({
            ...options,
            type: 'my-custom-node',
        });

        this.name = options.name || undefined;
        this.color = options.color || undefined;
        this.icon = options.icon || null;
        this.onClick = options.onClick || null;
    }

    setIcon(icon: any) {
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }

    initPorts(): void {
        throw new Error('Method not implemented.');
    }
    initLinks(): void {
        throw new Error('Method not implemented.');
    }

}