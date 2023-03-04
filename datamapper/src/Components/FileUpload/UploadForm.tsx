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
    var name = fileName + "_" + props.title + "_schema";

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
      var fileContent;
      try {
        // let fileReader = new FileReader();
        // fileReader.readAsText(file, 'utf-8');

        // fileReader.onloadend = async (e) => {
        //   fileContent = fileReader.result;
        //   if (fileContent !== null && typeof fileContent === 'string') {
        //     const jsonContent = JSON.parse(fileContent);
  
        //     console.log(jsonContent);
        //   }

        //   const res = await axios.post(`http://localhost:5000/createFile`, {
        //     filecontent: fileContent,
        //     filename: name
        //   })
        //   console.log(res.data);
        // }
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('filecontent',"This is content");
        // formData.append('filename', fileName + "_" + props.title + "_schema");

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