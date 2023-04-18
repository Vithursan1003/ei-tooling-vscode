import { Close, ExpandMore, FolderOpenOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { FunctionStyles } from './styles';
import { LinkConnectorNodeModel } from './../Nodes/LinkConnector/LinkConnectorNodeModel';
import { FileContext } from './../ContextProvider/FileContext';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import { DataMapperLinkModel } from '../Link/Model/DataMapperLinkModel';
import { TotNodes } from '../Diagram/DataMapperDiagram';

export interface FunctionEditorProps {
  onClose: () => void;
  engine: DiagramEngine;
  link?: DataMapperLinkModel;
}

const FunctionEditor: React.FunctionComponent<FunctionEditorProps> = (props) => {
  const { onClose, link } = props;
  const classes = FunctionStyles();
  const { setAddedNode } = React.useContext(FileContext);
  const IntermediateNodes: CustomNodeModel[] = [];
  const commonOperations = ['Constant', 'Custom Function', 'Properties', 'Compare', 'Global Variable'];
  const arithmeticOperations = ['Add', 'Subtract', 'Multiply', 'Division', 'Ceiling', 'Floor', 'Round', 'Set Precision', 'Absolute Val', 'Min', 'Max'];
  const booleanOperations = ['AND', 'OR', 'NOT'];
  const typeOperations = ['StringToNumber', 'StringToBoolean', 'ToString'];
  const stringOperations = ['Concat', 'Split', 'LowerCase', 'UpperCase', 'StringLength', 'StartsWith', 'EndsWith', 'Substring', 'Trim', 'Replace', 'Match'];

  var firstPoint, lastPoint, midX: number, midY: number;
  if (link) {
    firstPoint = link.getFirstPoint();
    lastPoint = link.getLastPoint();
    midX = (firstPoint.getX() + lastPoint.getX()) / 2;
    midY = (firstPoint.getY() + lastPoint.getY()) / 2;
  }

console.log("opened editor");
  const handleNode = () => {
    const commonNode = new LinkConnectorNodeModel({name:'Common'});
    link?.remove();
    commonNode.setPosition(midX, midY);
    IntermediateNodes.push(commonNode);
    setAddedNode(IntermediateNodes);
  }

  const handleStringNode = () => {
    const commonNode = new LinkConnectorNodeModel({name:'ConCat'});
    link?.remove();
    commonNode.setPosition(midX, midY);
    IntermediateNodes.push(commonNode);
    setAddedNode(IntermediateNodes);
  }

  
  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <List>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Close" className={classes.ListItemText} /><Close />
        </ListItem>
      </List>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Common" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {commonOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={handleNode} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Arithmetic" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {arithmeticOperations.map((operation, key) => {
              return (<>
                <ListItem >
                  <ListItemText primary={operation} className={classes.ListItemText} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Conditional" className={classes.ListItemText} />
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
          <FolderOpenOutlined /><ListItemText primary="Boolean" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {booleanOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} className={classes.ListItemText} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="Type Conversion" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {typeOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} className={classes.ListItemText} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} >
          <FolderOpenOutlined /><ListItemText primary="String" className={classes.ListItemText} onClick={handleStringNode}/>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {stringOperations.map((operation, key) => {
              return (<>
                <ListItem key={key}>
                  <ListItemText primary={operation} className={classes.ListItemText} />
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
