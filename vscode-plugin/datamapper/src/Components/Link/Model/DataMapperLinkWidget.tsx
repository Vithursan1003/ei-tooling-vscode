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

  generateLink(
    path: string,
    extraProps: React.Attributes,
    id: string | number
  ): JSX.Element {
    const ref = React.createRef<SVGPathElement>();
    this.refPaths.push(ref);
    return (
      <DefaultLinkSegmentWidget
        key={`link-${id}`}
        path={path}
        selected={this.state.selected}
        diagramEngine={this.props.diagramEngine}
        factory={this.props.diagramEngine.getFactoryForLink(
          this.props.link
        )}
        link={this.props.link}
        forwardRef={ref}
        onSelection={(selected) => {
          this.setState({ selected });
        }}
        extras={extraProps}
      />
    );
  }
}
