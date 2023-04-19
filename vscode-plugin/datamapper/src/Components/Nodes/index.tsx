import { DataMapperNodeFactory } from "./DataMapperNodes/DataMapperNodeFactory";
import { InputsNodeFactory } from "./InputsNodes/InputsNodeFactory";
import { LinkConnectorNodeFactory } from './LinkConnector/LinkConnectorNodeFactory';
import { JoinNodeFactory } from "./String/Join/JoinNodeFactory";

export const nodeFactories = [
    new InputsNodeFactory(),
    new DataMapperNodeFactory(),
    new JoinNodeFactory()
];
