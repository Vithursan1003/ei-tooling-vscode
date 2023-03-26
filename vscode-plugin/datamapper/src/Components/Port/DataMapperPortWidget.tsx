import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { DiagramEngine, PortModelListener, PortWidget } from "@projectstorm/react-diagrams-core";
import React from "react";
import DataMapperPortModel from "./DataMapperPortModel";
import { nodeStyles } from '../Nodes/styles';

export interface DataMapperPortWidgetProps {
    engine: DiagramEngine;
    port: DataMapperPortModel;
}

enum PortState {
    PortSelected,
    LinkSelected,
    Unselected
}

export const DataMapperPortWidget: React.FC<DataMapperPortWidgetProps> = ({ port, engine }) => {
    const classes = nodeStyles();
    const checkedIcon = <RadioButtonChecked color="disabled" sx={{ fontSize: '16px' }} />;
    const uncheckedIcon = <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />;
    const [portState, setPortState] = React.useState<PortState>(PortState.Unselected);
  
    React.useEffect(() => {
        port.registerListener({
            selectionChanged: () => {
                const isSelected = port.isSelected();
                console.log("port selection : ", isSelected);
                setPortState(isSelected ? PortState.PortSelected : PortState.Unselected);
            }
        });

    }, [port]);

    return (
        <PortWidget port={port} engine={engine} key={port.getID()}>
            <div className={classes.port} >
                {port.portType === 'IN' ? (
                    <div className={classes.portLabel}>
                        {port.getName()} {portState === PortState.PortSelected ? checkedIcon : uncheckedIcon}
                    </div>
                ) : (
                    <div className={classes.portIcon} >
                        {portState === PortState.PortSelected ? checkedIcon : uncheckedIcon} {port.getName()}
                    </div>
                )}
            </div>
        </PortWidget>
    )
}


