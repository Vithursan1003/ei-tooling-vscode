import { Close, ExpandMore, FolderOpenOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { FunctionStyles } from './styles';
import { FileContext } from './../ContextProvider/FileContext';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';
import { DataMapperLinkModel } from '../Link/Model/DataMapperLinkModel';
import { JoinNodeModel } from '../Nodes/Boolean_StringJoin/JoinNodeModel';
import { InputsNodeModel } from '../Nodes/InputsNodes/InputsNodeModel';
import { TransformNodeModel } from '../Nodes/String_Transform_TypeConversion/TransformNodeModel';
import { SplitNodeModel } from '../Nodes/String/Split/SplitNodeModel';
import { SubStringNodeModel } from '../Nodes/String/SubString/SubStringNodeModel';

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

  const handleNode = (operation: String) => {
    var commonNode: CustomNodeModel;
    switch (operation) {
      case 'Concat':
      case 'EndsWith':
      case 'StartsWith':
      case 'Match':
      case 'AND':
      case 'OR':
      case 'Add':
      case 'Subtract':
      case 'Multiply':
      case 'Division':
      case 'Set Precision':
      case 'Min':
      case 'Max':
      case 'Compare':
        {
          commonNode = new JoinNodeModel({ name: operation });
          break;
        }
      case 'UpperCase':
      case 'LowerCase':
      case 'Trim':
      case 'StringLength':
      case 'ToString':
      case 'StringToBoolean':
      case 'StringToNumber':
      case 'NOT':
      case 'Ceiling':
      case 'Floor':
      case 'Round':
      case 'Absolute Val':
        {
          commonNode = new TransformNodeModel({ name: operation });
          break;
        }
      case 'Split':
        {
          commonNode = new SplitNodeModel({ name: operation });
          break;
        }
      case 'SubString':
      case 'Replace':
      case 'If Else':
        {
          commonNode = new SubStringNodeModel({ name: operation });
          break;
        }
      default:
        {
          commonNode = new InputsNodeModel({ name: operation });
        }
    }

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
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="Common" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {commonOperations.map((operation, key) => {
              return (<>
                <ListItem key={key} className={classes.listItem}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={() => handleNode(operation)} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="Arithmetic" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {arithmeticOperations.map((operation, key) => {
              return (<>
                <ListItem className={classes.listItem}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={() => handleNode(operation)} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="Conditional" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem className={classes.listItem}>
              <ListItemText primary='If Else' onClick={() => handleNode('If Else')} />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="Boolean" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {booleanOperations.map((operation, key) => {
              return (<>
                <ListItem key={key} className={classes.listItem}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={() => handleNode(operation)} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="Type Conversion" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {typeOperations.map((operation, key) => {
              return (<>
                <ListItem key={key} className={classes.listItem}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={() => handleNode(operation)} />
                </ListItem>
              </>)
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} className={classes.accordian}>
          <FolderOpenOutlined /><ListItemText primary="String" className={classes.ListItemText} />
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {stringOperations.map((operation, key) => {
              return (<>
                <ListItem key={key} className={classes.listItem}>
                  <ListItemText primary={operation} className={classes.ListItemText} onClick={() => handleNode(operation)} />
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
