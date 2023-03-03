import React from 'react';
import { Close, DataUsageRounded, UploadFileRounded } from '@mui/icons-material';
import UploadForm from './UploadForm';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { uploadStyles } from './styles';

interface Props {
  title: string;
}

const Upload = (props: Props) => {

  const [open, setOpen] = React.useState(false);
  let title = props.title;
  const classes = uploadStyles();
  
  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <IconButton onClick={handleClick}><UploadFileRounded /></IconButton>
      <a onClick={handleClick}>Load {props.title} file</a>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.dialogHeader} >
          Load {props.title}
          <IconButton onClick={handleClose} className={classes.closeButton}> <Close /></IconButton>
        </DialogTitle>
        <DialogContent><UploadForm title={title} /></DialogContent>
      </Dialog>
    </>
  )
}

export default Upload;