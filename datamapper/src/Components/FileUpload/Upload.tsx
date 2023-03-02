import React from 'react';
import { FileUpload } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import { DataUsageOutlined } from '@mui/icons-material';
import UploadForm from './UploadForm';


interface Props {
  title: string;
}

const Upload = (props: Props) => {

  const [open, setOpen] = React.useState(false);

  const headerStyle = {
    height: '40px',
    color: 'white',
    backgroundColor: '#187bcd',
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
      <IconButton onClick={handleClick}><FileUpload /></IconButton>
      Load {props.title}
      
      <Modal show={open} onHide={handleClose} centered >
        <Modal.Header closeButton closeVariant='white' style={headerStyle}>
          <DataUsageOutlined fontSize='small' />
          <div style={{ paddingLeft: '15px' }}>Load {props.title}</div>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '11px' }}>
          <UploadForm/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Upload;