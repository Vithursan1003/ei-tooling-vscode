import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { LabelModel } from '@projectstorm/react-diagrams';
import { DataMapperLinkModel } from '../Link/Model/DataMapperLinkModel';

export interface DataMapperLabelOptions extends BaseModelOptions {
	value?: string;
	link?: DataMapperLinkModel;
	editorLabel?: string;
	deleteLink?: () => void;
    visible?: boolean;
}

export class DataMapperLabelModel extends LabelModel {
	value?: string;
	link?: DataMapperLinkModel;
	editorLabel?: string;
	deleteLink?: () => void;
    visible: boolean;

	constructor(options: DataMapperLabelOptions = {}) {
		super({
			...options,
			type: 'DataMapper-label'
		});
		this.value = options.value || '';
		this.link = options.link;
		this.editorLabel = options.editorLabel;
		this.deleteLink = options.deleteLink;
        this.visible = options.visible !== undefined ? options.visible : true;
	}

	serialize() {
		return {
			...super.serialize(),
			value: this.value
		};
	}

	deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.value = event.data.value;
	}
}
