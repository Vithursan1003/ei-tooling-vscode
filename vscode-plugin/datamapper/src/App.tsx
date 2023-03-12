import "./App.css";
import FileContextProvider from "./Components/ContextProvider/FileContextProvider";
import Diagram from "./Components/Diagram/Diagram";
import Test from "./Components/Test";
import Testing from "./Components/Testing";

function App() {
  return (
    <FileContextProvider>
      <Diagram/>
    </FileContextProvider>
  );
}

export default App;
