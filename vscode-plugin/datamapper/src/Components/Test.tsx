import React from 'react';
import createEngine, { CanvasWidget, DefaultLinkModel, DefaultNodeModel, DefaultPortModel, DiagramModel } from '@projectstorm/react-diagrams';
//import toJsonSchema from 'to-json-schema';
import { DataMapperNodeModel } from './Nodes/DataMapperNodes/DataMapperNodeModel';
import { DataMapperNodeFactory } from './Nodes/DataMapperNodes/DataMapperNodeFactory';

// interface MyObj {
//     [key:string] : unknown;
// }

const engine = createEngine();
const model = new DiagramModel();

const schema = {
  "type": "object", "properties":
    { "name": { "type": "string" }, "password": { "type": "string" } }
};
const val = schema.properties;
engine.getNodeFactories().registerFactory(new DataMapperNodeFactory());

const node1 = new DataMapperNodeModel(val, {
  name: 'Output',
  color: 'grey',
})

// const node1 = new DefaultNodeModel('Input', 'red');


// for (const [propertyName, property] of Object.entries(val)) {
//   const port = new DefaultPortModel({
//     name: `${propertyName} : ${property.type}`,
//   });
//   node1.addPort(port);
// }


// const node2 = new DefaultNodeModel('Output', 'blue');
// const port2 = node2.addPort(new DefaultPortModel(true, 'Port C', 'left'));
// node2.addPort(new DefaultPortModel(true, 'Port D', 'right'));

// const link1 = port1.link<DefaultLinkModel>(port2);
// let models = model.addAll(node1, node2);

model.addAll(node1);
engine.setModel(model);

// const objToBeConverted : MyObj = {
//     name: 'David',
//     rank: 7,
//     born: '1990-04-05T15:09:56.704Z',
//     luckyNumbers: [7, 77, 5]
// };

// const schema = toJsonSchema(objToBeConverted);
// console.log(schema);



const Test = () => {


  return (
    <>
      <CanvasWidget engine={engine} className="canvas" />
    </>
  )
}

export default Test