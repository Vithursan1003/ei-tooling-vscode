import { DataMapperNodeFactory } from "./DataMapperNodes/DataMapperNodeFactory";
import { InputsNodeFactory } from "./InputsNodes/InputsNodeFactory";
import { LinkConnectorNodeFactory } from './LinkConnector/LinkConnectorNodeFactory';

export const nodeFactories = [
    new InputsNodeFactory(),
    new DataMapperNodeFactory(),
    new LinkConnectorNodeFactory(),
];
