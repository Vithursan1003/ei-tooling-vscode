import React from 'react';
import { Add } from '@mui/icons-material';
import { uploadStyles } from '../FileUpload/styles';
import createEngine, { DefaultLinkWidget, DefaultPortModel, DiagramModel, NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { InputsNodeFactory } from '../Nodes/InputNodes/InputsNodeFactory';
import { InputsNodeModel } from '../Nodes/InputNodes/InputsNodeModel';
import UploadModal from '../FileUpload/UploadModal';
import { FileContext } from './../ContextProvider/FileContext';
import { DataMapperNodeFactory } from './../Nodes/DataMapperNodes/DataMapperNodeFactory';
import { DataMapperNodeModel } from '../Nodes/DataMapperNodes/DataMapperNodeModel';

const Diagram = () => {
    const classes = uploadStyles();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const { schemaInput, schemaOutput } = React.useContext(FileContext);

    const handleClose = (value: boolean) => {
        setOpen(value);
    }

    const engine = createEngine({ registerDefaultPanAndZoomCanvasAction: true });
    engine.getNodeFactories().registerFactory(new InputsNodeFactory());
    engine.getNodeFactories().registerFactory(new DataMapperNodeFactory());
    const model = new DiagramModel();
    let OutputBox;
    let OutputModel: InputsNodeModel | undefined;
    let inputModel : InputsNodeModel| undefined;
    let InputBox;


    if (schemaInput) {
        InputBox = new DataMapperNodeModel(schemaInput.properties, {
            name: 'Input',
            color: 'grey',
            icon: <Add color='disabled' />,
            onClick: () => {
                setTitle('Input');
                setOpen(true);
            }
        })
        if (inputModel) {
            inputModel.remove();
        }
    } else {
        InputBox = new InputsNodeModel({
            name: 'Input',
            color: 'grey',
            icon: <Add color='disabled' />,
            onClick: () => {
                setTitle('Input');
                setOpen(true);
            }
        })
        inputModel = InputBox;
    }

    if (schemaOutput) {
        OutputBox = new DataMapperNodeModel(schemaOutput.properties, {
            name: 'Output',
            color: 'grey',
            icon: <Add color='disabled' />,
            onClick: () => {
                setTitle('Output');
                setOpen(true);
            }
        })
        if (OutputModel) {
            OutputModel.remove();
        }
    } else {
        OutputBox = new InputsNodeModel({
            name: 'Output',
            color: 'grey',
            icon: <Add color='disabled' />,
            onClick: () => {
                setTitle('Output');
                setOpen(true);
            }
        })
        OutputModel = OutputBox;
    }

    InputBox.setPosition(100, 100);
    OutputBox.setPosition(400, 100);

    model.addAll(InputBox, OutputBox);
    engine.setModel(model);

    return (
        <>
            <CanvasWidget className={classes.canvas} engine={engine} />
            <UploadModal title={title} modalOpen={open} modalClose={handleClose} />
        </>
    )
}

export default Diagram;