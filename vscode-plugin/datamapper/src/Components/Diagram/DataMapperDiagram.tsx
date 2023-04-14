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

const DataMapperDiagram = (props:DataMapperDiagramProps) => {
    const classes = uploadStyles();
    const { nodes } = props;
    const engine = createEngine({ registerDefaultPanAndZoomCanvasAction: true, registerDefaultZoomCanvasAction: false });

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
    const [links, setLinks] = React.useState<DataMapperLinkModel[]>([]);
    const { addedNode,schemaInput,schemaOutput } = React.useContext(FileContext);


    model.registerListener({
        linksUpdated: () => {
            const NewLinks = engine.getModel().getLinks().map(link => new DataMapperLinkModel());;
            setLinks(NewLinks);
            console.log("links in model : ", NewLinks);
        },
    })
   

    React.useEffect(() => {
        async function genModel() {
            const allNodes = [...nodes, ...addedNode];
            const newNodes = allNodes.filter((node) => !model.getNode(node.name));
            for(const node of allNodes){
                console.log(model.getNode(node.name));
            }
            console.log("filtered nodes: ",newNodes);
            if (newNodes.length > 0) {
                const newModel = model.clone();
                newModel.addAll(...newNodes);
                for (const node of newNodes) {
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
                //dagreEngine.redistribute(newModel);
                setNewModel(newModel);
                const serializedData = newModel.serialize();
                localStorage.setItem('diagramData', serializedData);
            }
        }
        void genModel();
    }, [nodes, addedNode]);


    React.useEffect(() => {
        if (model.getLinks().length > 0) {
            //dagreEngine.redistribute(newModel);
            engine.repaintCanvas(true);
            console.log("links added to model successfully");
        }
    }, [links])

    engine.setModel(model);

    return (<CanvasWidget className={classes.canvas} engine={engine} />)
}

export default React.memo(DataMapperDiagram);