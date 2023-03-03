import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import axios from "axios";
import { uploadStyles } from './styles';

interface Props {
  title: string;
}

const UploadForm = (props: Props) => {

  const classes = uploadStyles();
  let fileReader: FileReader;
  const data = ['XML', 'JSON', 'XSD', 'CSV', 'JSON SCHEMA', 'CONNECTOR'];

  const [type, setType] = React.useState("JSON SCHEMA");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  const handleFileType = (e: SelectChangeEvent) => {
    setType(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(file){
    //   fileReader = new FileReader();
    //   fileReader.onloadend = () => {
    //     const content = fileReader.result;
    //     console.log(content);
    //     // localStorage.setItem(props.title, content);
    //     // localStorage.setItem(props.title + "Type", type);
    //   }
    //   fileReader.readAsText(file);
    // }


    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', props.title);
      axios.post(`http://localhost:5000/input/upload`, formData)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel className={classes.Label} >Resource Type : </FormLabel>
          <Select value={type} onChange={handleFileType} className={classes.Select} >
            {
              data.map((type, index) =>
                (<MenuItem className={classes.Label} key={index} value={type}>{type}</MenuItem>))
            }
          </Select>
        </FormControl>

        <InputLabel className={classes.Label}>Select from file system : </InputLabel>
        <input className={classes.FileInput && classes.Label} type="file" name='img' onChange={handleFile} required />

        <Button className={classes.saveButton} type="submit" variant='contained'>Save</Button>
      </form>
    </>
  )
}

export default UploadForm
