import React from 'react'
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { InputPortModel } from './InputPortModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class InputPortFactory extends AbstractReactFactory<InputPortModel,DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<InputPortModel>): JSX.Element {
        throw new Error('Method not implemented.');
    }
    generateModel(event: GenerateModelEvent): InputPortModel {
        throw new Error('Method not implemented.');
    }
 
}

export default InputPortFactory
