import React from 'react';
import {UploadFileRounded} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import { DataUsageOutlined } from '@mui/icons-material';
import UploadForm from './UploadForm';

interface Props {
  title: string;
}

const Upload = (props: Props) => {

  const [open, setOpen] = React.useState(false);
  let title = props.title;
  const headerStyle = {
    height: '40px',
    color: 'black',
    backgroundColor: '#ffffff',
    fontFamily: 'Asap',
    fontWeight: '700',
    fontSize: '14px',
    paddingLeft: '30px'
  }

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }

  return (
    <>
      <IconButton onClick={handleClick}><UploadFileRounded /></IconButton>
      <a onClick={handleClick}>Load {props.title} file</a>
      
      <Modal show={open} onHide={handleClose} centered >
        <Modal.Header closeButton closeVariant='black' style={headerStyle}>
          <DataUsageOutlined fontSize='small' />
          <div style={{ paddingLeft: '15px' }}>Load {props.title}</div>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '11px' }}>
          <UploadForm title={title}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Upload;