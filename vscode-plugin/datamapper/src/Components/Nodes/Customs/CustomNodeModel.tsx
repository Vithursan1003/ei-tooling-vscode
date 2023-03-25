import { DiagramModel, NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';

export interface CustomNodeFactoryInterface {}

export abstract class CustomNodeModel extends NodeModel<NodeModelGenerics> {
    name: any;
    private diagramModel: DiagramModel | undefined;
    
    constructor(options: any = {}) {
        super({
            ...options,
            type: 'my-custom-node',
        });

        this.name = options.name || undefined;
    }

	public setModel(model: DiagramModel) {
		this.diagramModel = model;
	}

	public getModel() {
		return this.diagramModel;
	}

	abstract initPorts(): void;
	abstract initLinks(): void;

}