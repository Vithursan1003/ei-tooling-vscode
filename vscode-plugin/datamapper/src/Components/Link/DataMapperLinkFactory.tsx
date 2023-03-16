import { DefaultLinkFactory } from '@projectstorm/react-diagrams';

import { DataMapperLinkModel } from './DataMapperLinkModel';
import { DataMapperLinkWidget } from './DataMapperLinkWidget';

export class DataMapperLinkFactory extends DefaultLinkFactory {
  constructor() {
    super('DataMapper-link');
  }

  generateModel() {
    return new DataMapperLinkModel();
  }

  generateReactWidget(event: any) {
    return <DataMapperLinkWidget link={event.model} diagramEngine={this.engine} />;
  }
}
