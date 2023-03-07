import React from 'react'
import { NodeModel } from '@projectstorm/react-diagrams';
import Upload from '../../FileUpload/Upload';

export class InputsNodeModel extends NodeModel {
    icon: any;
    onClick: any;
    name: any;
    color: any;

    constructor(options: any = {}) {
        super({
            ...options,
            type: 'my-custom-node',
        });
        this.name = options.name || undefined;
        this.color = options.color || undefined;
        this.icon = options.icon || null;
        this.onClick = options.onClick || null;
    }
    
    setIcon(icon: any) {
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }

    // setOnClick(callback: any) {
    //     this.onClick = callback;
    // }

    // getOnClick() {
    //     return this.onClick;
    // }

}

export default InputsNodeModel
