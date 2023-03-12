import { NodeModel, NodeModelGenerics, DefaultPortModel } from '@projectstorm/react-diagrams';

interface SchemaProperty {
    [key: string]: {
        type: string;
        description?: string;
    }
}

export class DataMapperNodeModel extends NodeModel<NodeModelGenerics> {

    icon: any;
    onClick: any;
    name: any;
    color: any;

   
    constructor(schema: SchemaProperty, options: any = {}) {
        console.log('DataMapperNodeModel constructor called');
        super({
            ...options,
            type: 'my-custom-node',
        });

        this.name = options.name || undefined;
        this.color = options.color || undefined;
        this.icon = options.icon || null;
        this.onClick = options.onClick || null;

        for (const [propertyName, property] of Object.entries(schema)) {
            const port = new DefaultPortModel({
                name: `${propertyName} : ${property.type}`,
            });
            this.addPort(port);
            console.log(`Adding port: ${port.getName()}`);
            console.log('DataMapperNodeModel Ports added');
        }

    }

    setIcon(icon: any) {
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }

}