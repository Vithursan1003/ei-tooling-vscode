import React from 'react';
import { FileContext } from '../ContextProvider/FileContext';
import { InputsNodeModel } from '../Nodes/InputsNodes/InputsNodeModel';
import { DataMapperNodeModel } from '../Nodes/DataMapperNodes/DataMapperNodeModel';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import DataMapperDiagram from './DataMapperDiagram';

const NodeManager = () => {
    const { schemaInput, schemaOutput } = React.useContext(FileContext);
    const [nodes, setNodes] = React.useState<CustomNodeModel[]>([]);

    React.useEffect(() => {
        const newNodes = [];

        if (!schemaInput) {
            const InputBox = new InputsNodeModel({ name: 'Input' });
            InputBox.setPosition(100, 50);
            newNodes.push(InputBox);
        } else {
            const InputDataMapper = new DataMapperNodeModel(schemaInput.properties, { name: 'Input', });
            InputDataMapper.setPosition(100, 50);
            newNodes.push(InputDataMapper);
            
        }

        if (!schemaOutput) {
            const OutputBox = new InputsNodeModel({ name: 'Output' });
            OutputBox.setPosition(800, 50);
            newNodes.push(OutputBox);
        } else {
            const OutputDataMapper = new DataMapperNodeModel(schemaOutput.properties, { name: 'Output', });
            OutputDataMapper.setPosition(800, 50);
            newNodes.push(OutputDataMapper);
        }
        setNodes(newNodes);
    }, [schemaInput, schemaOutput]);

    return (<DataMapperDiagram nodes={nodes} />);
};

export default NodeManager;