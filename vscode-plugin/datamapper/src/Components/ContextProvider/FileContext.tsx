import React from 'react';
import { CustomNodeModel } from '../Nodes/Customs/CustomNodeModel';

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
  addedNode : CustomNodeModel[];
  removedNode : CustomNodeModel | null;
  setSchemaInput: (schemaInput: Schema) => void;
  setSchemaOutput: (schemaOutput: Schema) => void;
  setAddedNode : (addedNode : CustomNodeModel []) => void;
  setRemovedNode : (removedNode : CustomNodeModel) => void;
}

export const FileContext = React.createContext<FileContextProps>({
  schemaInput: null,
  schemaOutput: null,
  addedNode : [],
  removedNode : null,
  setSchemaInput: () => {},
  setSchemaOutput: () => {},
  setAddedNode : () => {},
  setRemovedNode : () => {},
});
