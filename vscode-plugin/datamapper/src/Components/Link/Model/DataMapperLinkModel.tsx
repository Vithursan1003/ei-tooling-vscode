import { BezierCurve } from '@projectstorm/geometry';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { DataMapperLabelModel } from '../../LinkLabel/DataMapperLabelModel';

export class DataMapperLinkModel extends DefaultLinkModel {

	constructor() {
		super({
			type: 'DataMapper-link',
			width: 2,
			curvyness: 0,
			locked: true,
			color: "#00c0ff"
		})
	}

	addLabel(label: DataMapperLabelModel) {
		this.labels.push(label);
	}

	removeLabel(label: DataMapperLabelModel) {
		const index = this.labels.indexOf(label);
		if (index !== -1) {
			this.labels.splice(index, 1);
		}
	}

	getSVGPath(): string {
		if (this.points.length === 2) {
			const curve = new BezierCurve();
			curve.setSource(this.getFirstPoint().getPosition());
			curve.setTarget(this.getLastPoint().getPosition());

			const srcControl = this.getFirstPoint().getPosition().clone();
			srcControl.translate(220, 0);
			const targetControl = this.getLastPoint().getPosition().clone();
			targetControl.translate(-220, 0);
			curve.setSourceControl(srcControl);
			curve.setTargetControl(targetControl);

			if (this.sourcePort) {
				curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
			}

			if (this.targetPort) {
				curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
			}
			return curve.getSVGCurve();
		}
		return "";
	}
}

