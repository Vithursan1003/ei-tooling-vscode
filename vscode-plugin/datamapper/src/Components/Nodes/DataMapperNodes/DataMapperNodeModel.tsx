import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import DataMapperPortModel, { DataMapperNodeModelGenerics } from '../../Port/DataMapperPortModel';

interface SchemaProperty {
    [key: string]: {
        type: string;
        description?: string;
    }
}

interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

export class DataMapperNodeModel extends NodeModel<NodeModelGenerics & DataMapperNodeModelGenerics> {

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

        let portType: 'IN' | 'OUT' = 'IN';
        if (this.name === 'Output') {
            portType = 'OUT'
        }


        for (const [propertyName, property] of Object.entries(schema)) {
            const port = new DataMapperPortModel(`${propertyName} : ${property.type}`, portType)
            this.addPort(port);
        }

        Object.values(this.getPorts()).forEach((port) => {
            if (port.isSelected()) {
                port.setSelected(false);
                vscode.postMessage({
                    command: 'fail_alert',
                    text: `Port ${port.getName()} selected: ${port.isSelected()}`,
                });
            }
        });

    }

    setIcon(icon: any) {
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }

}