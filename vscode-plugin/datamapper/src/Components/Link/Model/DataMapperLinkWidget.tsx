import { DefaultLinkWidget} from '@projectstorm/react-diagrams';
import React from 'react';
import {DefaultLinkSegmentWidget} from './DataMapperLinkSegments';

export class DataMapperLinkWidget extends DefaultLinkWidget {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  getColor(): string {
    return this.state.selected ? 'red' : 'green';
  }


  handleClick(event: any): void {
    this.setState({ selected: true });
  }

}
