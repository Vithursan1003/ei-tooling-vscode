import React from 'react';

interface Schema {
  name?: string;
  description?: string;
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description?: string;
    }
  };
}

type FileContextProps = {
  schemaInput: Schema | null;
  schemaOutput: Schema | null;
  setSchemaInput: (schemaInput: Schema) => void;
  setSchemaOutput: (schemaOutput: Schema) => void;
}

export const FileContext = React.createContext<FileContextProps>({
  schemaInput: null,
  schemaOutput: null,
  setSchemaInput: () => {},
  setSchemaOutput: () => {}
});
