import "./App.css";
import FileContextProvider from "./Components/ContextProvider/FileContextProvider";
import Diagram from './Components/Diagram/Diagram';

function App() {
  return (
    <FileContextProvider>
      <Diagram/>
    </FileContextProvider>
  );
}

export default App;
