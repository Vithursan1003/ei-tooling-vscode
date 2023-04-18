import React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { IntermediatePortModel } from "./IntermediatePortModel";
import { Brightness1, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { portStyles } from "../styles";

export interface IntermediatePortWidgetProps {
    engine: DiagramEngine;
    port: IntermediatePortModel;
}

export const IntermediatePortWidget: React.FC<IntermediatePortWidgetProps> = (props: IntermediatePortWidgetProps) => {
    const classes = portStyles();
    const { engine, port } = props;
    const [active, setActive] = React.useState(false);
    const checkedIcon = <RadioButtonChecked color="disabled" sx={{ fontSize: '13px', color: 'white' }} />;
    const uncheckedIcon = <RadioButtonUnchecked color="disabled" sx={{ fontSize: '13px', color: 'white' }} />;
    const hasLinks = Object.entries(port.links).length > 0;

    React.useEffect(() => {
        port.registerListener({
            selectionChanged: () => {
                setActive(port.isSelected());
                console.log("Intermediaate port selected: ", port.portType);
            }
        })
    }, []);

    return (
        <PortWidget
            port={port}
            engine={engine}
            style={{
                display: "inline",
                color: active ? "#bfd6d5" : (hasLinks ? "#96C0CE" : "#FEF6EB")
            }}>
            {active ? <Brightness1 /> : (hasLinks ? checkedIcon : uncheckedIcon)}
            <div className={classes.port} >
                <div className={classes.portLabel}>
                    {port.getName()} {active ? checkedIcon : (hasLinks ? checkedIcon : uncheckedIcon)}
                </div>
            </div>
        </PortWidget >
    )
}
