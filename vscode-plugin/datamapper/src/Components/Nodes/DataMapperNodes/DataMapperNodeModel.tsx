import { DiagramEngine } from '@projectstorm/react-diagrams';
import DataMapperPortModel from '../../Port/DataMapperPortModel';
import { CustomNodeModel } from '../Customs/CustomNodeModel';

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

const selectedPorts: {
    sourcePort: DataMapperPortModel | null;
    targetPort: DataMapperPortModel | null;
} = {
    sourcePort: null,
    targetPort: null,
};


export class DataMapperNodeModel extends CustomNodeModel {

    icon: any;
    onClick: any;
    name: any;
    color: any;
 
    constructor(schema: SchemaProperty, options: any = {}) {
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
            const port = new DataMapperPortModel(`${propertyName} : ${property.type}`, portType);
            this.addPort(port);
        }

    }

    initPorts(): void {
        throw new Error('Method not implemented.');
    }
    initLinks(): void {
        throw new Error('Method not implemented.');
    }
}