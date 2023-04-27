import React from 'react';
import { InputsNodeModel } from './InputsNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { nodeStyles } from '../styles';
import { IntermediatePortWidget } from '../../Port/IntermediatePort/IntermediatePortWidget';

export interface InputsNodeProps {
    node: InputsNodeModel;
    engine: DiagramEngine;
}

export const InputsNodeWidget: React.FC<InputsNodeProps> = ({ node, engine }) => {
    const classes = nodeStyles();
    return (
        <>
            <div className={classes.joinNode}>
                <span className={classes.nodeLabel}>{node.name}</span>
                <IntermediatePortWidget engine={engine} port={node.inPort1} />
            </div>
        </>
    );
};
