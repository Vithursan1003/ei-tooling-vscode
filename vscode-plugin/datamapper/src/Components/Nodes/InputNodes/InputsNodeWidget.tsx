import React from 'react';
import { InputsNodeModel } from './InputsNodeModel';
import { DiagramEngine, PortModel, PortModelGenerics, PortWidget } from '@projectstorm/react-diagrams-core';
import { nodeStyles } from '../styles';
import { RadioButtonUnchecked } from '@mui/icons-material';

export interface InputsNodeProps {
    node: InputsNodeModel;
    engine: DiagramEngine;
}

export const InputsNodeWidget: React.FC<InputsNodeProps> = ({ node, engine }) => {
    const classes = nodeStyles();
    return (
        <>
            <div style={{ backgroundColor: node.color }} className={classes.node}>
                <span className={classes.nodeLabel}>{node.name}</span>
                <span className={classes.nodeIcon} onClick={() => { node.onClick() }}>{node.getIcon()}</span>
            </div>
        </>
    );
};
