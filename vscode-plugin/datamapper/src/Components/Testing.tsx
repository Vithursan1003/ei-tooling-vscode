import { Button } from '@mui/material';
import React from 'react';
import createEngine, { DiagramModel} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { InputsNodeFactory } from './Nodes/InputNodes/InputsNodeFactory';
import { DataMapperNodeFactory } from './Nodes/DataMapperNodes/DataMapperNodeFactory';
import { DataMapperPortFactory } from './Port/DataMapperPortFactory';
import { DataMapperLinkFactory } from './Link/DataMapperLinkFactory';
import { InputsNodeModel } from './Nodes/InputNodes/InputsNodeModel';
import DataMapperPortModel from './Port/DataMapperPortModel';
import { uploadStyles } from './FileUpload/styles';


interface vscode {
  postMessage(message: any): void;
}

declare const vscode: vscode;

const Testing = () => {

 const schema = {"type":"object","properties":{"name":{"type":"string"},"password":{"type":"string"}}};
 const val = schema.properties;
 const classes = uploadStyles();

 const handleClick = () =>{
  for (const [propertyName, property] of Object.entries(val)) {
    console.log(`${propertyName} : ${property.type}`);
  }
 }

 const engine = createEngine({ registerDefaultPanAndZoomCanvasAction: true });
 engine.getNodeFactories().registerFactory(new InputsNodeFactory());
 engine.getNodeFactories().registerFactory(new DataMapperNodeFactory());
 engine.getPortFactories().registerFactory(new DataMapperPortFactory());
 engine.getLinkFactories().registerFactory(new DataMapperLinkFactory());

 const model = new DiagramModel();

 const node = new InputsNodeModel({name :'Hi',color:'red'});
 const port2 = new DataMapperPortModel("port 1","IN");
 port2.registerListener({
  selectionChanged : () =>{
    console.log("port selected");
  }
 })

  return (
    <div>
      <Button onClick={handleClick}>Test</Button>
      <CanvasWidget className={classes.canvas} engine={engine} />
    </div>
  )
}

export default Testing


