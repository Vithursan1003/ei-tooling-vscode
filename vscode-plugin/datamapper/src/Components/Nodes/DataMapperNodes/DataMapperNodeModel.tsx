import DataMapperPortModel from '../../Port/DataMapperPort/DataMapperPortModel';
import { CustomNodeModel } from '../Customs/CustomNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams';

interface SchemaProperty {
    [key: string]: {
        type: string;
        description?: string;
    }
}

export class DataMapperNodeModel extends CustomNodeModel {
    name: any;
    schema: SchemaProperty;
    engine!: DiagramEngine;

    constructor(schema: SchemaProperty, options: any = {}) {
        super({
            ...options,
            type: 'my-custom-node',
        });
        this.name = options.name || undefined;
        this.schema = schema;
        this.initPorts();
    }

    initPorts(): void {
        let portType: 'IN' | 'OUT' = 'IN';
        if (this.name === 'Output') {
            portType = 'OUT';
        }

        for (const [propertyName, property] of Object.entries(this.schema)) {
            const port = new DataMapperPortModel(`${propertyName} : ${property.type}`, portType);
            this.addPort(port);
        }
    }

    initLinks(): void {}
}