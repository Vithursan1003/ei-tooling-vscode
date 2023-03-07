import { Button } from '@mui/material';

// declare global {
//     interface Window {
//       acquireVsCodeApi(): any;
//     }
//   }
  
//   const vscode = window.acquireVsCodeApi();
  

const Testing = () => {

    const handleClick = () =>{
        tsvscode.postMessage({command:"hello",text:"Hi Webview"});
    }
    
  return (
    <div>
        <Button onClick={handleClick}>Testing</Button>
    </div>
  )
}

export default Testing

 
