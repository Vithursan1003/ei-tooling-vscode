import { createStyles, makeStyles } from "@mui/styles";


export const uploadStyles = makeStyles((theme) => createStyles({
    dialogHeader: {
        height: '40px',
        color: 'white',
        backgroundColor: '#187bcd',
        fontFamily: 'Asap',
        fontWeight: '700',
        fontSize: '14px',
        padding: '0px 0px 10px 20px',
        marginBottom: '10px'
    },
    closeButton : {
        paddingLeft: '63%'
    },
    saveButton : {
        marginLeft: '70%', 
        fontSize: '10px', 
        width: '60px', 
        height: '30px'
    },
    Label : {
        fontSize :'11px'
    },
    Select : {
        margin: '8px 0px 10px 0px', 
        alignItems: 'center', 
        height: '35px', 
        fontSize: '11px', 
        minWidth: '130px' 
    },
    FileInput : {
        marginTop: '8px'
    },
})
);