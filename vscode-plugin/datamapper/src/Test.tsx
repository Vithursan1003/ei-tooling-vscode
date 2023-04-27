import { ExpandMore, FolderOpenOutlined } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const Test = () => {
    const stringOperations = ['Concat', 'Split', 'LowerCase', 'UpperCase', 'StringLength', 'StartsWith', 'EndsWith', 'Substring', 'Trim', 'Replace', 'Match'];
    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} style={{backgroundColor:'blue'}}>
                    <FolderOpenOutlined /><ListItemText primary="String"  />
                </AccordionSummary>
                <AccordionDetails style={{backgroundColor:'#d8d8d8'}} >
                    <List style={{lineHeight:'1px'}}>
                        {stringOperations.map((operation, key) => {
                            return (<>
                                <ListItem key={key} style={{paddingTop:'2px',paddingBottom:'2px'}}>
                                    <ListItemText primary={operation} />
                                </ListItem>
                            </>)
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Test
