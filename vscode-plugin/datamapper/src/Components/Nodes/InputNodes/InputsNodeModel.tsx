import { NodeModel, NodeModelGenerics, DefaultPortModel } from '@projectstorm/react-diagrams';

export class InputsNodeModel extends NodeModel<NodeModelGenerics> {

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

}