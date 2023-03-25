import { createStyles, makeStyles } from "@mui/styles";

export const nodeStyles = makeStyles(() => createStyles({
    node: {
        height: '30px',
        width: '200px',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '2px',
        backgroundColor : 'grey',
    },
    nodeLabel: {
        textAlign: 'center',
        fontSize: '15px',
        fontFamily: 'Asap',
        color: 'white'
    },
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