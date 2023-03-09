import { Button } from '@mui/material'
import React from 'react'
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Test from '../Test';

interface Props {
  title: string;
  someFunction: (data: any) => void;
}


const UploadForm = (props: Props) => {

  let fileReader: FileReader;
  const data = ['Resource Type', 'XML', 'JSON', 'XSD', 'CSV', 'JSON SCHEMA', 'CONNECTOR'];

  const [type, setType] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [showForm, setShowForm] = React.useState<boolean>(true);

  var data1 = '';

  const buttonStyle = { marginLeft: '83%', fontSize: '10px', width: '60px', height: '30px' }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append ('filename',props.title);
      axios.post(`http://localhost:5000/input/upload`, formData)
        .then(response => {
          console.log(response.data);
          data1 = response.data;
          props.someFunction(data1);
        })
        .catch(error => {
          console.log(error);
        });  
    }
    return (
      <div>
        <Test title={data1} />
      </div>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit} >
        <FormSelect size='sm' style={{ width: '140px', fontSize: '12px' }}
          name="type" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
          {
            data.map((type, index) =>
              (<option key={index} value={type}>{type}</option>))
          }
        </FormSelect> <br />

        <span>Select from file system :  </span>
        <input type="file" name='img' onChange={handleImage} /> <br />

        <Button style={buttonStyle} type="submit" variant='contained'>Save</Button>
      </Form>
    </>
    
  )
}

export default UploadForm
