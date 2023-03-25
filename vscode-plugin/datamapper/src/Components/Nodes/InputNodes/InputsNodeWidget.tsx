import React from 'react';
import { InputsNodeModel } from './InputsNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { nodeStyles } from '../styles';
import { Add } from '@mui/icons-material';

export interface InputsNodeProps {
    node: InputsNodeModel;

}

export const InputsNodeWidget: React.FC<InputsNodeProps> = ({ node}) => {
    const classes = nodeStyles();
    return (
        <>
            <div className={classes.node}>
                <span className={classes.nodeLabel}>{node.name}</span>
            </div>
        </>
    );
};
