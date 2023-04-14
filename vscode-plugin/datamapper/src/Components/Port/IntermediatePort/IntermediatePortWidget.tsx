import React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { IntermediatePortModel } from "./IntermediatePortModel";
import { Brightness1, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

export interface IntermediatePortWidgetProps {
    engine: DiagramEngine;
    port: IntermediatePortModel;
}

export const IntermediatePortWidget: React.FC<IntermediatePortWidgetProps> = (props: IntermediatePortWidgetProps) => {
    const { engine, port } = props;
    const [active, setActive] = React.useState(false);
    const [ disableNewLinking, setDisableNewLinking] = React.useState<boolean>(false);
    const checkedIcon = <RadioButtonChecked color="disabled" sx={{ fontSize: '13px', color :'white'}} />;
    const uncheckedIcon = <RadioButtonUnchecked color="disabled" sx={{ fontSize: '13px',color:'white' }} />;
    const hasLinks = Object.entries(port.links).length > 0;

	// React.useEffect(() => {
	// 	port.registerListener({
    //         mappingStartedFrom : () =>{
    //             console.log("Mapping started from");
    //             setActive(true);
    //         },
    //         mappingFinishedTo : () =>{
    //             console.log("Mapping finished to");
    //             setActive(true);
    //         },
    //         linkUnselected : () =>{
    //             console.log("link unselected");
    //             setActive(false);
    //         }
	// 	})
	// }, [port]);

	// React.useEffect(() => {
	// 	port.registerListener({
    //         disableNewLinking : () =>{
    //             console.log("disableNewLinking");
    //             setDisableNewLinking(true);
    //         },
    //         enableNewLinking : () =>{
    //             console.log("enableNewLinking");
    //             setDisableNewLinking(false);
    //         }
	// 	})
	// }, [port]);

    React.useEffect(()=>{
        port.registerListener({
            selectionChanged : () =>{
                setActive(port.isSelected());
                console.log("Intermediaate port selected: ",port.portType);
            }
        })
    },[]);

    return (
        <PortWidget
            port={port}
            engine={engine}
            style={{
                display: "inline",
                color: active ? "#bfd6d5" : (hasLinks ? "#96C0CE" : "#FEF6EB")}}>
            {active ? <Brightness1 /> : (hasLinks ? checkedIcon : uncheckedIcon)}
        </PortWidget>
    )
}
