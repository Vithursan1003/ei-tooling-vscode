import React from 'react';
import {DataMapperNodeModel } from './DataMapperNodeModel';
import { DiagramEngine, PortModel, PortModelGenerics, PortWidget } from '@projectstorm/react-diagrams-core';
import { nodeStyles } from '../styles';
import { RadioButtonUnchecked } from '@mui/icons-material';

export interface DataMapperNodeProps {
    node: DataMapperNodeModel;
    engine: DiagramEngine;
}

export const DataMapperNodeWidget: React.FC<DataMapperNodeProps> = ({ node, engine }) => {
    const classes = nodeStyles();
    const inputPorts = Object.values(node.getPorts());

    const renderPortsRecursively = (ports: PortModel[], index: number = 0) => {
        if (index >= ports.length) {
            return null;
        }

        const port = ports[index];

        return (
            <PortWidget key={port.getID()} port={port} engine={engine}>
                <div key={port.getID()} className={classes.port}>{port.getName()}
                    <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />
                </div>
                {renderPortsRecursively(ports, index + 1)}
            </PortWidget>
        );
    }

    return (
        <>
            <div style={{ backgroundColor: node.color }} className={classes.node}>
                <span className={classes.nodeLabel}>{node.name}</span>
                <span className={classes.nodeIcon} onClick={() => { node.onClick() }}>{node.getIcon()}</span>
                <div className={classes.portContainer}>
                    {renderPortsRecursively(inputPorts)}
                </div>
            </div>
        </>
    );
};
