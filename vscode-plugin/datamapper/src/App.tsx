import "./App.css";
import FileContextProvider from "./Components/ContextProvider/FileContextProvider";
import DataMapper from "./Components/DataMapper";
import DataMapperDiagram from "./Components/Diagram/DataMapperDiagram";

function App() {
  return (
    <FileContextProvider>
      <DataMapper/>
    </FileContextProvider>
  );
}

export default App;
