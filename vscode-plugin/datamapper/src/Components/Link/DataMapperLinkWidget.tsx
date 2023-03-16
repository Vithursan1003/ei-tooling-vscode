import { DefaultLinkWidget } from '@projectstorm/react-diagrams';

export class DataMapperLinkWidget extends DefaultLinkWidget {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  
  generatePath(path: string): string {
    return path;
  }

  
  getColor(): string {
    return this.state.selected ? 'red' : 'green';
  }

 
  handleClick(event: any): void {
    this.setState({ selected: true });
  }
  
}
