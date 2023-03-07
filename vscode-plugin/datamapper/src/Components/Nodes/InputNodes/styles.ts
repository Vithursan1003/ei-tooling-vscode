import { createStyles, makeStyles } from "@mui/styles";


export const nodeStyles = makeStyles(() => createStyles({
    node: {
        height: '30px',
        width: '200px',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        borderRadius : '7px'
    },
    nodeLabel : {
        textAlign :'center',
        fontSize : '15px',
        fontFamily : 'Asap',
        color :'white'
    },
    nodeIcon :{ 
        marginTop: '3px', 
        paddingLeft : '25%'
    }
})
);