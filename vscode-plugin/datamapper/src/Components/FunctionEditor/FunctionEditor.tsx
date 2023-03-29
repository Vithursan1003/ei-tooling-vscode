import { Close, ExpandMore, FolderOpenOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';

export interface FunctionEditorProps {
  onClose: () => void;
}

const FunctionEditor: React.FunctionComponent<FunctionEditorProps> = (props) => {
  const { onClose } = props;
  const commonOperations = ['Constant', 'Custom Function', 'Properties', 'Compare', 'Global Variable'];
  const arithmeticOperations = ['Add', 'Subtract', 'Multiply', 'Division', 'Ceiling', 'Floor', 'Round', 'Set Precision', 'Absolute Val', 'Min', 'Max'];
  const booleanOperations = ['AND', 'OR', 'NOT'];
  const typeOperations = ['StringToNumber', 'StringToBoolean', 'ToString'];
  const stringOperations = ['Concat', 'Split', 'LowerCase', 'UpperCase', 'StringLength', 'StartsWith', 'EndsWith', 'Substring', 'Trim', 'Replace', 'Match'];

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <List>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Close" /><Close />
        </ListItem>
      </List>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Common" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {commonOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Arithmetic" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {arithmeticOperations.map((operation, key) => {
              return (<>
                <ListItem >
                  <ListItemText primary={operation} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Conditional" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary='If Else' />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Boolean" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {booleanOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Type Conversion" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {typeOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="String" />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {stringOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

    </Drawer>
  );
};

export default FunctionEditor;
