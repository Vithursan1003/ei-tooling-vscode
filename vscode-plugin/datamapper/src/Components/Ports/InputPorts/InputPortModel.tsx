import { DefaultLinkModel, DefaultPortModel, LinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class InputPortModel extends DefaultPortModel{
  constructor(alignment: PortModelAlignment) {
		super({
			type: 'diamond',
			name: alignment,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}

