import React from 'react';
import { uploadStyles } from '../FileUpload/styles';
import createEngine, { DagreEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DataMapperPortFactory } from '../Port/DataMapperPortFactory';
import { DataMapperLinkFactory } from '../Link/Model/DataMapperLinkFactory';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import { DataMapperLinkModel } from '../Link/Model/DataMapperLinkModel';
import { nodeFactories } from '../Nodes';
import { DefaultState } from './../LinkState/DefaultState';

interface DataMapperDiagramProps {
    nodes?: CustomNodeModel[];
    links?: DataMapperLinkModel[];
}

const Diagram = (props: DataMapperDiagramProps) => {
    const classes = uploadStyles();
    const { nodes} = props;
    const engine = createEngine();
    
    for (const factory of nodeFactories) {engine.getNodeFactories().registerFactory(factory);}
    engine.getPortFactories().registerFactory(new DataMapperPortFactory());
    engine.getLinkFactories().registerFactory(new DataMapperLinkFactory());
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
    
    React.useEffect(() => {
        console.log("use effect");
        console.log(nodes);
        async function genModel() {

            if (nodes) {
                const newModel = new DiagramModel();
                newModel.addAll(...nodes);
                for (const node of nodes) {
                    try {
                        node.setModel(newModel);
                        await node.initPorts();
                        node.initLinks();
                        engine.repaintCanvas();
                    } catch (e) {
                        console.error(e)
                    }
                }
                // newModel.setLocked(true);
                if (newModel.getLinks().length > 0) {
                    dagreEngine.redistribute(newModel);
                    await engine.repaintCanvas(true);
                }
                setNewModel(newModel);
            }
        }
        void genModel();
    }, [nodes]);

    engine.setModel(model);

    return (<CanvasWidget className={classes.canvas} engine={engine} />)
}

export default React.memo(Diagram);