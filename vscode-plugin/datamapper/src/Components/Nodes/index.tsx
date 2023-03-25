import { DataMapperNodeFactory } from "./DataMapperNodes/DataMapperNodeFactory";
import { InputsNodeFactory } from "./InputNodes/InputsNodeFactory";

export const nodeFactories = [
    new InputsNodeFactory(),
    new DataMapperNodeFactory(),
];
