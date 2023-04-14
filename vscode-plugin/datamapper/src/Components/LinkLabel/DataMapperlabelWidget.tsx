import { CodeOutlined, Delete } from '@mui/icons-material';
import * as React from 'react';
import { DataMapperLabelModel } from './DataMapperLabelModel';
import { LabelStyles } from './styles';
import FunctionEditor from '../FunctionEditor/FunctionEditor';
import { Tooltip } from '@mui/material';
import { DiagramEngine } from '@projectstorm/react-diagrams';

interface vscode {
    postMessage(message: any): void;
}

declare const vscode: vscode;

export interface DataMapperLabelWidgetProps {
    model: DataMapperLabelModel;
    engine: DiagramEngine;
}

export enum LinkState {
    TemporaryLink,
    LinkSelected,
    LinkNotSelected
}

export const DataMapperLabelWidget: React.FunctionComponent<DataMapperLabelWidgetProps> = (props) => {
    const classes = LabelStyles();
    const { model,engine } = props;
    const [linkStatus, setLinkStatus] = React.useState<LinkState>(LinkState.LinkNotSelected);
    const [deleteInProgress, setDeleteInProgress] = React.useState(false);
    const [editorOpen, setEditorOpen] = React.useState(false);
    var firstPoint, lastPoint, midX: number =0, midY: number=0;

    if(model?.link){
        firstPoint = model?.link.getFirstPoint();
        lastPoint = model?.link.getLastPoint();
        midX = (firstPoint.getX() + lastPoint.getX()) / 2;
        midY = (firstPoint.getY() + lastPoint.getY()) / 2;
    }

    const onDelete = (e?: React.MouseEvent<HTMLDivElement>) => {
        console.log('link removed');
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        try {
            setDeleteInProgress(true);
            model?.link?.remove();
            vscode.postMessage({ command: 'success_alert', text: 'Link removed successfully' });
        } catch (e) {
            vscode.postMessage({ command: 'fail_alert', text: 'Error, Cant remove link' });
        }
    };

    const onEdit = (e?: React.MouseEvent<HTMLDivElement>) => {
        console.log('Edit link');
        setEditorOpen(true);
    };

    React.useEffect(() => {
        if (model?.link) {
            const link = model.link;
            link.registerListener({
                selectionChanged: () => {
                    setLinkStatus(link.isSelected() ? LinkState.LinkSelected : LinkState.LinkNotSelected);
                    console.log('link is selected : ', link.isSelected());
                }
            });
        } else {
            setLinkStatus(LinkState.TemporaryLink);
        }
    }, [model]);

    const elements: React.ReactNode[] = [
        (
            <>
                <div
                    className={classes.container}
                    style={{ position: 'absolute', left: `${midX}px`, top: `${midY}px` }}
                    data-testid={`DataMapper-label-for-${props.model?.link?.getSourcePort()?.getName()}-to-${props.model?.link?.getTargetPort()?.getName()}`}>
                    <div className={classes.element} onClick={onEdit} data-testid={`DataMapper-label-edit`}>
                        <div className={classes.iconWrapper}>
                            <Tooltip title="Configure">
                                <CodeOutlined className={classes.IconButton} />
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.separator} />
                    {deleteInProgress ? (
                        <></>) : (
                        <div className={classes.element} onClick={onDelete} data-testid={`DataMapper-label-delete`}>
                            <div className={classes.iconWrapper}>
                                <Tooltip title="Delete">
                                    <Delete className={classes.IconButton} />
                                </Tooltip>
                            </div>
                        </div>
                    )}
                </div>
            </>
        ),
        editorOpen && <FunctionEditor onClose={() => setEditorOpen(false)} engine={engine} link={model?.link}/>
    ];

    return linkStatus === LinkState.LinkSelected ? (
        <>
            {elements}
        </>
    ) : (
        <></>
    );
};
