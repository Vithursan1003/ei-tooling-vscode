import { DataMapperNodeFactory } from "./DataMapperNodes/DataMapperNodeFactory";
import { InputsNodeFactory } from "./InputsNodes/InputsNodeFactory";

export const nodeFactories = [
    new InputsNodeFactory(),
    new DataMapperNodeFactory(),
];
