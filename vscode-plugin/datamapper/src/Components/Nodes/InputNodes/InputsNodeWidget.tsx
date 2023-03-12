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

    const leftPort = node.getPort('Input');
    const topPort = node.getPort('Output');

    console.log('Left port:', leftPort);
    console.log('Top port:', topPort);

    return (
        <>
            <div style={{ backgroundColor: node.color }} className={classes.node}>
                <span className={classes.nodeLabel}>{node.name}</span>
                <span className={classes.nodeIcon} onClick={() => { node.onClick() }}>{node.getIcon()}</span>
                <div className={classes.portContainer}>
                    {leftPort && <PortWidget port={leftPort} engine={engine}>
                        <div className={classes.port}>{leftPort.getName()}
                            <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />
                        </div>
                    </PortWidget>}
                    {topPort && <PortWidget port={topPort} engine={engine}>
                        <div className={classes.port}>{topPort.getName()}
                            <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />
                        </div>
                    </PortWidget>}
                </div>
            </div>
        </>
    );
};
