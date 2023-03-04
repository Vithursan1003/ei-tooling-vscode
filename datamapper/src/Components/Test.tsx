import React from 'react';
import createEngine, { CanvasWidget, DefaultLinkModel, DefaultNodeModel, DefaultPortModel, DiagramModel } from '@projectstorm/react-diagrams';
//import toJsonSchema from 'to-json-schema';

// interface MyObj {
//     [key:string] : unknown;
// }

const engine = createEngine();
const model = new DiagramModel();

const schema = {"properties": {
    "name": {
      "type": "string"
    },
    "rank": {
      "type": "integer"
    },
    "born": {
      "type": "string",
      "format": "date-time"
    },
    "luckyNumbers": {
      "type": "array",
      "items": {
        "type": "integer"
      }
    }
  }}

const node1 = new DefaultNodeModel('Input', 'red');
const port1=node1.addPort(new DefaultPortModel(true, 'Port A', 'bottom'));
node1.addPort(new DefaultPortModel(true, 'Port B', 'top'));


const node2 = new DefaultNodeModel('Output', 'blue');
const port2=node2.addPort(new DefaultPortModel(true, 'Port C', 'left'));
node2.addPort(new DefaultPortModel(true, 'Port D', 'right'));

const link1 = port1.link<DefaultLinkModel>(port2);
let models =model.addAll(node1, node2,link1);


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