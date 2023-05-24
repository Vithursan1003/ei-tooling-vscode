import React from 'react';
import createEngine, { DiagramModel, DefaultNodeModel, DefaultLabelModel } from '@projectstorm/react-diagrams';

const Test = () => {
    var engine = createEngine();

    //2) setup the diagram model
    var model = new DiagramModel();

    //3-A) create a default node
    var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    var port1 = node1.addOutPort('Out');
    node1.setPosition(100, 100);

    //3-B) create another default node
    var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    var port2 = node2.addInPort('In');
    node2.setPosition(400, 100);

    //3-C) link the 2 nodes together
    var link1 = port1.link(port2);
    link1.addLabel(new DefaultLabelModel({ label: 'Label' }));

    //4) add the models to the root graph
    model.addAll(node1, node2, link1);

    //5) load model into engine
    engine.setModel(model);
    return (
        <div>
            <h1>hii</h1>
        </div>
    )
}

export default Test
