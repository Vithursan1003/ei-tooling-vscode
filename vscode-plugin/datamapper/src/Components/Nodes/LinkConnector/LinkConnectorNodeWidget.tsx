import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { LinkConnectorNodeModel } from './LinkConnectorNodeModel';
import { nodeStyles } from './../styles';
import { CodeOutlined, Delete, ExplicitOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { IntermediatePortWidget } from '../../Port/IntermediatePort/IntermediatePortWidget';

export interface LinkConnectorNodeWidgetProps {
    node: LinkConnectorNodeModel;
    engine: DiagramEngine;
}

export const LinkConnectorNodeWidget: React.FC<LinkConnectorNodeWidgetProps> = ({ node, engine }) => {
    const classes = nodeStyles();
    const [deleteInProgress, setDeleteInProgress] = React.useState(false);

    const onClickEdit = () => {
        console.log("Edit intermediate nodes");
    };

    const onClickDelete = () => {
        setDeleteInProgress(true);
        const nodeId = node.getID();
        engine.getModel().removeNode(node);
        console.log("delete intermediate nodes");
    };


    return (
        <>
            <div className={classes.node}><span className={classes.nodeLabel}>{node.name}</span></div>
            <div className={classes.root}>
                <div className={classes.header}>
                    <IntermediatePortWidget engine={engine} port={node.inPort} />
                    <div className={classes.element} onClick={onClickEdit} >
                        <Tooltip title="Configure" className={classes.icons}>
                            <CodeOutlined sx={{ fontSize: '14px', color: 'black' }} />
                        </Tooltip>
                    </div>
                    <div className={classes.element} onClick={onClickDelete} >
                        <Tooltip title="Delete" className={classes.icons}>
                            <Delete sx={{ fontSize: '14px', color: 'black' }} />
                        </Tooltip>
                    </div>
                    <IntermediatePortWidget engine={engine} port={node.outPort} />
                </div>
            </div>
        </>

    );
}
