import React from 'react';
import { InputsNodeModel } from './InputsNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import Upload from '../FileUpload/Upload';

export interface InputsNodeProps {
    node: InputsNodeModel;
    engine: DiagramEngine
}

export const InputsNodeWidget: React.FC<InputsNodeProps> = ({ node }) => {
   
    return (
        <div
            style={{
                borderRadius: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                width: '150px',
                height: '30px',
                position: 'relative'
            }}
            
        >
            <div style={{ backgroundColor: node.color }}>{node.name}
                <span style={{ marginTop: '3px' }} onClick={()=>{node.onClick()}}>
                    {node.getIcon()}</span>
               
            </div>
        </div>
    );
};
