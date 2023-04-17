import DataMapperPortModel from '../../Port/DataMapperPort/DataMapperPortModel';
import { CustomNodeModel } from '../Customs/CustomNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { DataMapperLinkModel } from '../../Link/Model/DataMapperLinkModel';
import { DataMapperLabelModel } from '../../LinkLabel/DataMapperLabelModel';

interface SchemaProperty {
    [key: string]: {
        type: string;
        description?: string;
    }
}

export class DataMapperNodeModel extends CustomNodeModel {
    name: string;
    schema: SchemaProperty;
    engine!: DiagramEngine;

    constructor(schema: SchemaProperty, options: any = {}) {
        super('my-datamapper-node',options.name);
        this.name = options.name || undefined;
        this.schema = schema;
        this.initPorts();
    }

    initPorts(): void {
        let portType: 'IN' | 'OUT' = 'OUT';
        if (this.name === 'Output') {
            portType = 'IN';
        }

        for (const [propertyName, property] of Object.entries(this.schema)) {
            const port = new DataMapperPortModel(`${propertyName} : ${property.type}`, portType);
            this.addPort(port);
        }
    }

    initLinks(): void {
        // let inPort !: DataMapperPortModel;
        // let mappedOutPort !: DataMapperPortModel;

        // const ports = Object.values(this.getPorts()) as DataMapperPortModel[];
        // ports.forEach(port => {
        //     const isSelected = port.isSelected();
        //     console.log("port selection : ", isSelected);
        //     if (port.isSelected()) {
        //         if (port.portType === 'IN') {
        //             console.log("selected port sourceport");
        //             inPort = port;
        //         } else if (port.portType === 'OUT') {
        //             console.log("Selected port is target");
        //             mappedOutPort = port;
        //         }
        //     }
        // });

    
        // const lm = new DataMapperLinkModel();
        // if (inPort && mappedOutPort) {
        //     lm.addLabel(new DataMapperLabelModel({
        //         link: lm, value: 'Link1'
        //     }));
        //     lm.setTargetPort(mappedOutPort);
        //     lm.setSourcePort(inPort);
        //     inPort.addLinkedPort(mappedOutPort);
        //     lm.registerListener({
        //         selectionChanged: () => {
        //             if (lm.isSelected()) {
        //                 inPort.fireEvent({}, "linkSelected");
        //                 mappedOutPort.fireEvent({}, "linkSelected");
        //             } else {
        //                 inPort.fireEvent({}, "linkUnselected");
        //                 mappedOutPort.fireEvent({}, "linkUnselected");
        //             }
        //         }
        //     })
        //     console.log("adding link in node");
        //     this.engine.getModel().addAll(lm);
        // }
    }
}