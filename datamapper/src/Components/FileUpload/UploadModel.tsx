import { Button } from '@mui/material'
import React from 'react'
import UploadForm from './UploadForm';
import Modal from 'react-bootstrap/Modal';
import { DataUsageOutlined } from '@mui/icons-material';

interface Props {
  title: string;
  show : boolean;
  //close : boolean;
}

const UploadModel = (props: Props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const headerStyle = {
    height: '40px',
    color: 'white',
    backgroundColor: '#187bcd',
    fontFamily: 'Asap',
    fontWeight: '700',
    fontSize: '14px',
    paddingLeft: '30px'
  }


  return (
    <>
      <Modal show={props.show} centered >
        <Modal.Header closeButton closeVariant='white' style={headerStyle}>
          <DataUsageOutlined fontSize='small'/>
          <div style={{ paddingLeft: '15px' }}>Load {props.title}</div>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '11px' }}>
          <UploadForm />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UploadModel