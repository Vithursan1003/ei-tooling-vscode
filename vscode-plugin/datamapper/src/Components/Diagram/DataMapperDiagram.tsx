import React from 'react';
import { uploadStyles } from '../FileUpload/styles';
import createEngine, { DagreEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import { nodeFactories } from '../Nodes';
import { DefaultState } from '../LinkState/DefaultState';
import { DataMapperLinkFactory } from './../Link/Model/DataMapperLinkFactory';
import { DataMapperLinkModel } from './../Link/Model/DataMapperLinkModel';
import { DataMapperLabelFactory } from './../LinkLabel/DataMapperLabelFactory';
import { portFactories } from '../Port';
import { FileContext } from './../ContextProvider/FileContext';

interface DataMapperDiagramProps {
    nodes: CustomNodeModel[];
}

export var TotNodes: CustomNodeModel[] = [];

const DataMapperDiagram = () => {
    const classes = uploadStyles();
    //const { nodes } = props;
    const [engine, setEngine] = React.useState(createEngine());
    for (const factory of nodeFactories) { engine.getNodeFactories().registerFactory(factory); }
    for (const factory of portFactories) { engine.getPortFactories().registerFactory(factory); }
    engine.getLinkFactories().registerFactory(new DataMapperLinkFactory());
    engine.getLabelFactories().registerFactory(new DataMapperLabelFactory());
    engine.getStateMachine().pushState(new DefaultState());

    const dagreEngine = new DagreEngine({
        graph: {
            rankdir: 'LR',
            ranksep: 600,
            align: 'UL',
            nodesep: 300,
            ranker: 'longest-path',
            marginx: 30,
            marginy: 50,
            fit: true
        },
    });

    const [model, setNewModel] = React.useState<DiagramModel>(new DiagramModel());
    // const serializedN = localStorage.getItem('serializedData');
    // console.log("serialized : ", serializedN);
    // if (serializedN) {
    //     console.log("model deseriliazed");
    //     const deserializedModel = new DiagramModel();
    //     deserializedModel.deserializeModel(JSON.parse(serializedN), engine);
    //     console.log('Deserialized:', deserializedModel);
    // }

    // const [model, setNewModel] = React.useState<DiagramModel>(() => {
    //     if (serializedN) {
    //         const deserializedModel = new DiagramModel();
    //         deserializedModel.deserializeModel(JSON.parse(serializedN), engine);
    //         return deserializedModel;
    //     } else {
    //         return new DiagramModel();
    //     }
    // });

    const [links, setLinks] = React.useState<DataMapperLinkModel[]>([]);
    const { addedNode, removedNode } = React.useContext(FileContext);

    model.registerListener({
        linksUpdated: () => {
            const NewLinks = engine.getModel().getLinks().map(link => new DataMapperLinkModel());;
            setLinks(NewLinks);
        },
    })

    React.useEffect(() => {
        if (model.getLinks().length > 0) {
            engine.repaintCanvas(true);
            console.log("links added to model successfully");
        }
    }, [links])

    React.useEffect(() => {
        async function genModel() {
            TotNodes = [...TotNodes, ...addedNode];
            //const allNodes = [...nodes, ...TotNodes];
            const allNodes = [...addedNode];

            if (allNodes.length > 0) {
                const newModel = model.clone();
                newModel.addAll(...allNodes);
                for (const node of allNodes) {
                    try {
                        node.setModel(newModel);
                        await node.initPorts();
                        node.initLinks();
                        engine.repaintCanvas();
                    } catch (e) {
                        console.error(e);
                    }
                }
                newModel.setLocked(false);
                setNewModel(newModel);
            }
        }
        void genModel();
    }, [addedNode]);

    React.useEffect(() => {
        if (removedNode && model.getNode(removedNode.getID())) {
            model.getLinks().forEach(link => {
                if (link.getSourcePort().getParent() === removedNode || link.getTargetPort().getParent() === removedNode) {
                    model.removeLink(link);
                }
            });
            model.removeNode(removedNode);
        }
    }, [removedNode]);

    const serialized = JSON.stringify(model.serialize());
    localStorage.setItem("serializedData", serialized);
    engine.setModel(model);

    return (<CanvasWidget className={classes.canvas} engine={engine} />)
}

export default React.memo(DataMapperDiagram);