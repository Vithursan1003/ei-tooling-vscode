import { Button } from '@mui/material'
import React from 'react'
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Form from 'react-bootstrap/Form';

const UploadForm = () => {

  let fileReader: FileReader;
  const data = ['Resource Type', 'XML', 'JSON', 'XSD', 'CSV', 'JSON SCHEMA', 'CONNECTOR'];

  const [type, setType] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(file){
      fileReader = new FileReader();
      fileReader.onloadend = () => {
        const content = fileReader.result;
        console.log(content);
        // localStorage.setItem(props.title, content);
        // localStorage.setItem(props.title + "Type", type);
      }
      fileReader.readAsText(file);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} >
        <FormSelect size='sm' style={{ width: '140px', fontSize: '12px' }}
          name="type" onChange={(e) => setType(e.target.value)}>
          {
            data.map((type,index) =>
              (<option key={index} value={type}>{type}</option>))
          }
        </FormSelect> <br />

        <span>Select from file system :  </span>
        <input type="file" name='img' onChange={handleImage} /> <br />

        <Button style={{ marginLeft: '83%', fontSize: '10px', width: '60px', height: '30px' }} type="submit" variant='contained'>Save</Button>
      </Form>
    </>
  )
}

export default UploadForm