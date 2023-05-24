import React from 'react';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
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

export var TotNodes: CustomNodeModel[] = [];
const defaultModelOptions = { zoom: 90 };
interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

const DataMapperDiagram = () => {
    const classes = DiagramStyles();
    const [engine, setEngine] = React.useState(createEngine({ registerDefaultZoomCanvasAction: true }));
    for (const factory of nodeFactories) { engine.getNodeFactories().registerFactory(factory); }
    for (const factory of portFactories) { engine.getPortFactories().registerFactory(factory); }
    engine.getLinkFactories().registerFactory(new DataMapperLinkFactory());
    engine.getLabelFactories().registerFactory(new DataMapperLabelFactory());
    engine.getStateMachine().pushState(new DefaultState());

    
    const [links, setLinks] = React.useState<DataMapperLinkModel[]>([]);
    const { addedNode, removedNode } = React.useContext(FileContext);

    const ModelDiagram = new DiagramModel();
    React.useEffect(() => {
        console.log("react initialized");
        window.addEventListener('message', (e) => {
            if (e.data.command === 'serialized') {

                console.log("deserialization code");
                console.log("serialized diagram 1: ", ModelDiagram)
                const parsed = JSON.parse(e.data.data);
                ModelDiagram.deserializeModel(parsed, engine)
                vscode.postMessage({ command: 'success_alert', text: 'diagram updated successfully' });
                console.log("serialized diagram 2: ", ModelDiagram)
            }
        });
    }, [])

    const [model, setNewModel] = React.useState<DiagramModel>(ModelDiagram);

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
                        ID: link.getSourcePort()?.getParent()?.getID(),
                        alignment: link.getSourcePort()?.getPortType()
                    },
                    targetPort: {
                        nodeId: link.getTargetPort()?.getParent()?.getName(),
                        portId: link.getTargetPort()?.getName(),
                        ID: link.getTargetPort()?.getParent()?.getID(),
                        alignment: link.getTargetPort()?.getPortType()
                    },
                    isChecked: false,
                    linkId: link.getOptions().id
                };
                console.log("new Link : ", Link);
                diagramLink.push(Link);
            })
            console.log("All links : ", diagramLink);
            vscode.postMessage({ command: 'DMC', linkData: diagramLink });
        },
    })

    React.useEffect(() => {
        if (model.getLinks().length > 0) {
            engine.repaintCanvas(true);
            console.log("links added to model successfully");
        }
        const serialized = JSON.stringify(model.serialize());
        vscode.postMessage({
            command: 'serializing',
            fileContent: serialized
        });
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
        const serialized = JSON.stringify(model.serialize());
        vscode.postMessage({
            command: 'serializing',
            fileContent: serialized
        });
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
        const serialized = JSON.stringify(model.serialize());
        vscode.postMessage({
            command: 'serializing',
            fileContent: serialized
        });
    }, [removedNode]);

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