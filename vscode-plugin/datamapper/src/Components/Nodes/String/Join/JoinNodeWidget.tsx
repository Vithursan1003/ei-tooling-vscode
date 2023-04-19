import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { JoinNodeModel } from './JoinNodeModel';
import { nodeStyles } from '../../styles';
import { IntermediatePortWidget } from '../../../Port/IntermediatePort/IntermediatePortWidget';
import { FileContext } from '../../../ContextProvider/FileContext';
import { Grid } from '@mui/material';

export interface JoinNodeWidgetProps {
    node: JoinNodeModel;
    engine: DiagramEngine;
}

export const JoinNodeWidget: React.FC<JoinNodeWidgetProps> = ({ node, engine }) => {
    const classes = nodeStyles();
    const { setRemovedNode } = React.useContext(FileContext);
    const [deleteInProgress, setDeleteInProgress] = React.useState(false);

    const onClickEdit = () => {
        console.log("Edit Join nodes");
    };

    const onClickDelete = () => {
        setDeleteInProgress(true);
        const nodeId = node.getID();
        setRemovedNode(node);
        console.log("delete intermediate nodes");
    };


    return (
        <>
            <div className={classes.joinNode}>
                <span className={classes.nodeLabel}>{node.name}</span>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <IntermediatePortWidget engine={engine} port={node.inPort1} />
                        <IntermediatePortWidget engine={engine} port={node.inPort2} />
                    </Grid>
                    <Grid item xs={6}>
                        <IntermediatePortWidget engine={engine} port={node.outPort} />
                    </Grid>
                </Grid>
                <div onClick={onClickDelete}>Delete</div>
            </div>
        </>

    );
}
