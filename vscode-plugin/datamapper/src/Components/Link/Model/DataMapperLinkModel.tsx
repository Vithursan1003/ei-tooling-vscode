import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import DataMapperPortModel from '../../Port/DataMapperPortModel';

export class DataMapperLinkModel extends DefaultLinkModel {

	constructor() {
		super({
			type: 'DataMapper-link',
			width: 10,
			color: 'black'
		});
	}

	getSVGPath(): string {
		const sourcePort = this.getSourcePort();
		const targetPort = this.getTargetPort();

		if (!sourcePort || !targetPort) {
			return '';
		}

		const sourcePos = sourcePort.getPosition();
		const targetPos = targetPort.getPosition();

		return `M${sourcePos.x},${sourcePos.y} L${targetPos.x},${targetPos.y}`;
	}

	

}

