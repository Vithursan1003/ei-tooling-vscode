import React from 'react';
import { Add } from '@mui/icons-material';
import { uploadStyles } from './styles';
import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { InputsNodeFactory } from '../Nodes/InputNodes/InputsNodeFactory';
import { InputsNodeModel } from '../Nodes/InputNodes/InputsNodeModel';
import UploadModal from './UploadModal';

const Upload = () => {
  const classes = uploadStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const handleClose = (value: boolean ) => {
    setOpen(value);
  }

  const engine = createEngine();
  engine.getNodeFactories().registerFactory(new InputsNodeFactory());
  const model = new DiagramModel();

  const InputBox = new InputsNodeModel({
    name: 'Input',
    color: 'grey',
    icon: <Add color='disabled' />,
    onClick: () => {
      setTitle('Input');
      setOpen(true);
    }
  })

  InputBox.setPosition(100, 100);

  const OutputBox = new InputsNodeModel({
    name: 'Output',
    color: 'grey',
    icon: <Add color='disabled' />,
    onClick: () => {
      setTitle('Output');
      setOpen(true);
    }
  })
  OutputBox.setPosition(400, 100);

  model.addAll(InputBox, OutputBox);
  engine.setModel(model);

  return (
    <>
      <CanvasWidget className={classes.canvas} engine={engine} />
      <UploadModal title={title} modalOpen={open} modalClose={handleClose}/>
    </>
  )
}

export default Upload;