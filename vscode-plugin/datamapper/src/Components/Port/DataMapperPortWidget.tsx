import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import React from "react";
import DataMapperPortModel from "./DataMapperPortModel";
import { nodeStyles } from '../Nodes/styles';
import { BaseEvent } from "@projectstorm/react-canvas-core";

export interface DataMapperPortWidgetProps {
    engine: DiagramEngine;
    port: DataMapperPortModel;
}

interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

export const DataMapperPortWidget: React.FC<DataMapperPortWidgetProps> = ({ port, engine }) => {
    const classes = nodeStyles();
    const [active, setActive] = React.useState(false);
    const hasLinks = Object.entries(port.links).length > 0;

    React.useEffect(() => {
        port.registerListener({
            selectionChanged: () => {
                vscode.postMessage({ command: 'fail_alert', text: 'event fired' });
                setActive(port.isSelected());
                vscode.postMessage({ command: 'fail_alert', text: 'active' });
            },
        })
    }, [port]);
      

    return (
        <PortWidget port={port} engine={engine} key={port.getID()}  >
            <div className={classes.port} >
                {port.portType === 'IN' ? (
                    <div>
                        {port.getName()} <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />
                    </div>
                ) : (
                    <div>
                        <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} /> {port.getName()}
                    </div>
                )}

                {/* {active ? <RadioButtonChecked color="disabled" sx={{ fontSize: '16px' }} /> :
                    <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />} */}
            </div>
        </PortWidget>
    )
}


