import React from 'react';
import { FileContext } from '../ContextProvider/FileContext';
import { InputsNodeModel } from '../Nodes/InputNodes/InputsNodeModel';
import Diagram from './Diagram';
import { DataMapperNodeModel } from '../Nodes/DataMapperNodes/DataMapperNodeModel';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';

const NodeManager = () => {
    const { schemaInput, schemaOutput } = React.useContext(FileContext);
    const [nodes, setNodes] = React.useState<CustomNodeModel[]>([]);

    React.useEffect(() => {
        const newNodes = [];

        if (!schemaInput) {
            const InputBox = new InputsNodeModel({ name: 'Input' });
            InputBox.setPosition(200, 20);
            newNodes.push(InputBox);
        } else {
            const InputDataMapper = new DataMapperNodeModel(schemaInput.properties, { name: 'Input', });
            InputDataMapper.setPosition(800, 20);
            newNodes.push(InputDataMapper);
        }

        if (!schemaOutput) {
            const OutputBox = new InputsNodeModel({ name: 'Output' });
            OutputBox.setPosition(800, 20);
            newNodes.push(OutputBox);
        } else {
            const OutputDataMapper = new DataMapperNodeModel(schemaOutput.properties, { name: 'Output', });
            OutputDataMapper.setPosition(800, 20);
            newNodes.push(OutputDataMapper);
        }
        setNodes(newNodes);
    }, [schemaInput, schemaOutput]);

    return (<Diagram nodes={nodes} />);
};

export default NodeManager;
