import { Button } from '@mui/material';

interface vscode {
  postMessage(message: any): void;
}

declare const vscode: vscode;

const Testing = () => {

  const handleClick = () => {
    // tsvscode.postMessage({ command: "hello", text: "Hi Webview" });
    vscode.postMessage({ command: 'success_alert',text : 'Hiii Webview'})
  }

  return (
    <div>
      <Button onClick={handleClick}>Testing</Button>
    </div>
  )
}

export default Testing


