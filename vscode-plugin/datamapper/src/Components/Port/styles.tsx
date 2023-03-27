import { createStyles, makeStyles } from "@mui/styles";

export const portStyles = makeStyles(() => createStyles({
    portContainer: {
        padding: '8px',
        border: '1px solid grey',
    },
    port: {
        width: '183px',
        height: '25 px',
        background: '#D3D3D3',
        fontSize: '11px',
        border: '1px solid #83a9cc',
        padding: '4px'
    },
    portLabel :{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    portIcon :{
        display: "flex",
        justifyContent: "stretch",
        alignItems: "center",
    }
})
);