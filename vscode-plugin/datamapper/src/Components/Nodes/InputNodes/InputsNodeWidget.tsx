import React from 'react';
import { InputsNodeModel } from './InputsNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { nodeStyles } from '../styles';

export interface InputsNodeProps {
    node: InputsNodeModel;

}

export const InputsNodeWidget: React.FC<InputsNodeProps> = ({ node}) => {
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
