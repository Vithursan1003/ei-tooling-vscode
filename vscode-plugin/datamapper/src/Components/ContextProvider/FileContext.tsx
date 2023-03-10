import React from 'react';

type FileContextProps = {
  schemaInput: any;
  schemaOutput: any;
  setSchemaInput: (schemaInput: any) => void;
  setSchemaOutput: (schemaOutput: any) => void;
}

export const FileContext = React.createContext<FileContextProps>({
  schemaInput: null,
  schemaOutput: null,
  setSchemaInput: () => {},
  setSchemaOutput: () => {}
});
