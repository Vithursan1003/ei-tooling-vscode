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
    joinNode : {
        height: '25px',
        width: '120px',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '2px',
        backgroundColor : '#ADD8E6',
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
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    icons: {
        padding: '8px',
        '&:hover': {
            backgroundColor: '#F0F1FB',
        }
    },
    expandIcon: {
        height: '15px',
        width: '15px',
        marginTop: '-7px'
    },
    buttonWrapper: {
        border: '1px solid #e6e7ec',
        borderRadius: '8px',
        position: "absolute",
        right: "35px"
    },
    editIcon: {
        color: 'white',
        padding: "5px",
        height: "32px",
        width: "32px"
    },
})
);

