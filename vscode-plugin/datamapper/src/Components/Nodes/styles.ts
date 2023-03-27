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
})
);