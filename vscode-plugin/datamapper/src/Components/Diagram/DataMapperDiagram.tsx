import React from 'react';
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
import { Cached, FitScreen } from '@mui/icons-material';
import { DiagramStyles } from './styles';
import { Tooltip } from '@mui/material';

// interface DataMapperDiagramProps {
//     nodes: CustomNodeModel[];
// }

export var TotNodes: CustomNodeModel[] = [];
const defaultModelOptions = { zoom: 90 };
interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

const DataMapperDiagram = () => {
    const classes = DiagramStyles();
    //const { nodes } = props;
    const [engine, setEngine] = React.useState(createEngine({ registerDefaultZoomCanvasAction: true }));
    for (const factory of nodeFactories) { engine.getNodeFactories().registerFactory(factory); }
    for (const factory of portFactories) { engine.getPortFactories().registerFactory(factory); }
    engine.getLinkFactories().registerFactory(new DataMapperLinkFactory());
    engine.getLabelFactories().registerFactory(new DataMapperLabelFactory());
    engine.getStateMachine().pushState(new DefaultState());

    const [model, setNewModel] = React.useState<DiagramModel>(new DiagramModel());
    const [links, setLinks] = React.useState<DataMapperLinkModel[]>([]);
    const { addedNode, removedNode } = React.useContext(FileContext);

    // React.useEffect(() => {
    //     const serializedData = localStorage.getItem('serializedData');
    //     console.log("serialized Data: ", serializedData);
    //     if (serializedData) {
    //         const parsed = JSON.parse(serializedData);
    //         model.deserializeModel(parsed, engine)
    //         console.log('Deserialized:', model);
    //     }
    // }, [])

    model.registerListener({
        linksUpdated: async (event: any) => {
            const AllLinks = engine.getModel().getLinks().map(link => new DataMapperLinkModel());;
            setLinks(AllLinks);

            const diagramLink: any = [];
            const currentLinks = engine.getModel().getLinks();
            currentLinks.forEach((link) => {
                const Link = {
                    sourcePort: {
                        nodeId: link.getSourcePort()?.getParent()?.getName(),
                        portId: link.getSourcePort()?.getName(),
                        ID: link.getSourcePort()?.getID(),
                        alignment: link.getSourcePort()?.getPortType()
                    },
                    targetPort: {
                        nodeId: link.getTargetPort()?.getParent()?.getName(),
                        portId: link.getTargetPort()?.getName(),
                        ID: link.getTargetPort()?.getID(),
                        alignment: link.getTargetPort()?.getPortType()
                    },
                    linkId: link.getOptions().id
                };
                console.log("new Link : ", Link);
                diagramLink.push(Link);
            })
            console.log("All links : ", diagramLink);
            vscode.postMessage({ command: 'DMC',linkData : diagramLink});
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
    console.log("serialized data : ", serialized);
    engine.setModel(model);

    const resetZoomAndOffset = () => {
        const currentModel = engine.getModel();
        currentModel.setZoomLevel(defaultModelOptions.zoom);
        currentModel.setOffset(0, 0);
        engine.setModel(currentModel);
    }

    return (<>
        <CanvasWidget className={classes.canvas} engine={engine} />
        <div className={classes.buttonWrap}>
            <Tooltip title="Fit to Screen">
                <div className={classes.iconWrap} onClick={resetZoomAndOffset}>
                    <Cached className={classes.icon} />
                </div>
            </Tooltip>
            <Tooltip title="Zoom">
                <div className={classes.iconWrap} onClick={() => void engine.zoomToFitNodes({ maxZoom: 60 })}>
                    <FitScreen className={classes.icon} />
                </div>
            </Tooltip>
        </div>
    </>)
}

export default React.memo(DataMapperDiagram);