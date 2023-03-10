import React from 'react';
import { FileContext } from './FileContext';

type FileContextProviderProps = {
  children: React.ReactNode;
};

const FileContextProvider: React.FC<FileContextProviderProps> = ({ children }) => {
    const [schemaInput, setSchemaInput] = React.useState<any>(null);
    const [schemaOutput, setSchemaOutput] = React.useState<any>(null);

  return (
    <FileContext.Provider value={{schemaInput,schemaOutput,setSchemaInput,setSchemaOutput}}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
