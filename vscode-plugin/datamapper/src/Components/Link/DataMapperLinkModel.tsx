import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export class DataMapperLinkModel extends DefaultLinkModel {
  constructor() {
    super({
      type: 'custom-link', 
      width: 2, 
    });
  }
}
