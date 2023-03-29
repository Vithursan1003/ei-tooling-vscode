import { Brightness1, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import React from "react";
import DataMapperPortModel from "./DataMapperPortModel";
import { portStyles } from "../styles";

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
    const classes = portStyles();
    const checkedIcon = <RadioButtonChecked color="disabled" sx={{ fontSize: '16px' }} />;
    const uncheckedIcon = <RadioButtonUnchecked color="disabled" sx={{ fontSize: '16px' }} />;
    const activeIcon = <Brightness1 color="disabled" sx={{ fontSize: '16px' }} />;
    const [portState, setPortState] = React.useState<PortState>(PortState.Unselected);
    const hasLinks = Object.entries(port.links).length > 0;
  
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
        <PortWidget port={port} engine={engine} key={port.getID()} 
        style={{color: portState === PortState.PortSelected ? "#93a2b5" : (hasLinks ? "#96C0CE" : "#FEF6EB")}}>
            <div className={classes.port} >
                {port.portType === 'IN' ? (
                    <div className={classes.portLabel}>
                        {port.getName()} {portState === PortState.PortSelected ? checkedIcon : (hasLinks ? activeIcon : uncheckedIcon)}
                    </div>
                ) : (
                    <div className={classes.portIcon} >
                       {portState === PortState.PortSelected ? checkedIcon : (hasLinks ? activeIcon : uncheckedIcon)}{port.getName()}
                    </div>
                )}
            </div>
        </PortWidget>
    )
}


