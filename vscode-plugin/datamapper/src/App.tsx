import "./App.css";
import FileContextProvider from "./Components/ContextProvider/FileContextProvider";
import DataMapper from "./Components/DataMapper";
import Test from "./Test";

function App() {
  return (
    <FileContextProvider>
      <DataMapper/>
    </FileContextProvider>
    // <Test/>
  );
}

export default App;
