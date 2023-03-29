import { CodeOutlined, Delete } from '@mui/icons-material';
import * as React from 'react';
import { DataMapperLabelModel } from './DataMapperLabelModel';
import { LabelStyles } from './styles';
import FunctionEditor from '../FunctionEditor/FunctionEditor';

export interface DataMapperLabelWidgetProps {
    model: DataMapperLabelModel;
}

export enum LinkState {
    TemporaryLink,
    LinkSelected,
    LinkNotSelected
}

export const DataMapperLabelWidget: React.FunctionComponent<DataMapperLabelWidgetProps> = (props) => {
    const classes = LabelStyles();
    const { model } = props;
    const [linkStatus, setLinkStatus] = React.useState<LinkState>(LinkState.LinkNotSelected);
    const [deleteInProgress, setDeleteInProgress] = React.useState(false);
    const [editorOpen, setEditorOpen] = React.useState(false);

    const onClickDelete = (e?: React.MouseEvent<HTMLDivElement>) => {
        console.log('link removed');
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setDeleteInProgress(true);
        model?.link?.remove();
    };

    const onClickEdit = (e?: React.MouseEvent<HTMLDivElement>) => {
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
                    data-testid={`DataMapper-label-for-${props.model?.link?.getSourcePort()?.getName()}-to-${props.model?.link?.getTargetPort()?.getName()}`}>
                    <div className={classes.element} onClick={onClickEdit} data-testid={`DataMapper-label-edit`}>
                        <div className={classes.iconWrapper}>
                            <CodeOutlined className={classes.IconButton} />
                        </div>
                    </div>
                    <div className={classes.separator} />
                    {deleteInProgress ? (
                        <></>) : (
                        <div className={classes.element} onClick={onClickDelete} data-testid={`DataMapper-label-delete`}>
                            <div className={classes.iconWrapper}>
                                <Delete className={classes.IconButton} />
                            </div>
                        </div>
                    )}
                </div>
            </>
        ),
        editorOpen && <FunctionEditor onClose={() => setEditorOpen(false)} />
    ];

    return linkStatus === LinkState.LinkSelected ? (
        <>
            {elements}
        </>
    ) : (
        <></>
    );
};
