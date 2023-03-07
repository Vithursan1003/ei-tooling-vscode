import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import axios from "axios";
import { uploadStyles } from './styles';


interface Props {
  title: string;
}

const UploadForm = (props: Props) => {

  const classes = uploadStyles();

  const data = ['XML', 'JSON', 'XSD', 'CSV', 'JSON SCHEMA', 'CONNECTOR'];

  const [type, setType] = React.useState("JSON SCHEMA");
  const [fileName, setFileName] = React.useState(props.title);
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

  const handleFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', fileName + "_" + props.title );
        const res = await axios.post(`http://localhost:5000/input/upload`, formData)
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
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

        <InputLabel className={classes.Label}>Input File name : </InputLabel>
        <TextField className={classes.TextField}
          name='fileName' onChange={handleFileName} size="small" />

        <InputLabel className={classes.Label}>Select from file system : </InputLabel>
        <input className={classes.Label} type="file" name='file' onChange={handleFile} />

        <Button className={classes.saveButton} type="submit" variant='contained' disabled={!file}>Save</Button>
      </form>
    </>
  )
}

export default UploadForm