import "./App.css";
import FileContextProvider from "./Components/ContextProvider/FileContextProvider";
import Upload from "./Components/FileUpload/Upload";
import Testing from "./Components/Testing";

function App() {
  return (
    <FileContextProvider>
      <Upload/>
    </FileContextProvider>
  );
}

export default App;
