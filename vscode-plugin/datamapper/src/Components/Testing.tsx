import { Button } from '@mui/material';

interface vscode {
  postMessage(message: any): void;
}

declare const vscode: vscode;

const Testing = () => {

 const schema = {"type":"object","properties":{"name":{"type":"string"},"password":{"type":"string"}}};
 const val = schema.properties;

 const handleClick = () =>{
  for (const [propertyName, property] of Object.entries(val)) {
    console.log(`${propertyName} : ${property.type}`);
  }
 }

  return (
    <div>
      <Button onClick={handleClick}>Test</Button>
    </div>
  )
}

export default Testing


