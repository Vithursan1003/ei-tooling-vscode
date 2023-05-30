import React from 'react';
import { FileContext } from '../ContextProvider/FileContext';
import { DataMapperNodeModel } from '../Nodes/DataMapperNodes/DataMapperNodeModel';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import DataMapperDiagram from './DataMapperDiagram';
import { InputsNodeModel } from '../Nodes/InputsNodes/InputsNodeModel';

const NodeManager = () => {
    const { schemaInput, schemaOutput } = React.useContext(FileContext);
    const {setAddedNode} = React.useContext(FileContext);

    React.useEffect(() => {
        const newNodes : CustomNodeModel[]= [];
        if (schemaInput) {
            console.log("schema input properties : ", schemaInput.properties)
            const InputDataMapper = new DataMapperNodeModel(schemaInput.properties, { name: 'Input'});
            InputDataMapper.setPosition(100, 50);
            newNodes.push(InputDataMapper);
            setAddedNode(newNodes);
        }
    }, [schemaInput]);

    React.useEffect(() => {
        const newNodes : CustomNodeModel[]= [];
        if (schemaOutput) {
            const OutputDataMapper = new DataMapperNodeModel(schemaOutput.properties, { name: 'Output'});
            OutputDataMapper.setPosition(800, 50);
            newNodes.push(OutputDataMapper);
            setAddedNode(newNodes);
        } 
    }, [schemaOutput]);

    return (<DataMapperDiagram />);
};

export default NodeManager;