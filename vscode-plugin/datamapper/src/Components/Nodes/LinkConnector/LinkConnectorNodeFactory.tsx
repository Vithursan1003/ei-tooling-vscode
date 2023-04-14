import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { LinkConnectorNodeWidget } from './LinkConnectorNodeWidget';
import { LinkConnectorNodeModel} from './LinkConnectorNodeModel';

export class LinkConnectorNodeFactory extends AbstractReactFactory<LinkConnectorNodeModel, DiagramEngine> {
	constructor() {
		super('link-connector-node');
	}

	generateReactWidget(event: { model: LinkConnectorNodeModel; }): JSX.Element {
		return <LinkConnectorNodeWidget node={event.model} engine={this.engine}/>;
	}

    generateModel(event: any) :LinkConnectorNodeModel {
		return new LinkConnectorNodeModel();
	}
}

