import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { DiagramEngine, PortModelListener, PortWidget } from "@projectstorm/react-diagrams-core";
import React from "react";
import DataMapperPortModel from "./DataMapperPortModel";
import { nodeStyles } from '../Nodes/styles';

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
    const checkedIcon = <RadioButtonChecked color="disabled" sx={{ fontSize: '16px' }} />;
    const uncheckedIcon = <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />;
    const [selectedPort, setSelectedPort] = React.useState<DataMapperPortModel | null>(null);
    const hasLinks = Object.entries(port.links).length > 0;


    const handleSelectionChanged = () => {

        if(port !== selectedPort){
            port.setSelected(true);
            setSelectedPort(port);
            vscode.postMessage({ command: 'success_alert', text: `Port ${port.getName()} selected` });
        }else{
            port.setSelected(false);
            setSelectedPort(null);
            vscode.postMessage({ command: 'success_alert', text: `Port ${port.getName()} deselected` });
        }
       
    };

    return (
        <PortWidget port={port} engine={engine} key={port.getID()}>
            <div className={classes.port} onClick={handleSelectionChanged}>
                {port.portType === 'IN' ? (
                    <div className={classes.portLabel}>
                        {port.getName()} {selectedPort === port ? checkedIcon : uncheckedIcon}
                    </div>
                ) : (
                    <div className={classes.portIcon} >
                        {selectedPort === port ? checkedIcon : uncheckedIcon} {port.getName()}
                    </div>
                )}
            </div>
        </PortWidget>
    )
}


