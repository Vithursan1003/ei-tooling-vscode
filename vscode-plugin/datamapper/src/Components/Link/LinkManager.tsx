import { DefaultLinkModel, DiagramEngine, DiagramModel, PortModel } from '@projectstorm/react-diagrams';

interface LinkManagerProps {
  engine: DiagramEngine;
  diagramModel: DiagramModel;
}

export class LinkManager {
  private sourcePort: PortModel | null = null;
  private targetPort: PortModel | null = null;
  private engine: DiagramEngine;
  private diagramModel: DiagramModel;

  constructor(props: LinkManagerProps) {
    this.engine = props.engine;
    this.diagramModel = props.diagramModel;
  }

  public setSourcePort(port: PortModel) {
    this.sourcePort = port;
  }

  public setTargetPort(port: PortModel) {
    this.targetPort = port;
  }

  public createLink() {
    if (!this.sourcePort || !this.targetPort) {
      throw new Error('Both source and target ports must be set to create a link');
    }

    const link = new DefaultLinkModel();
    link.setSourcePort(this.sourcePort);
    link.setTargetPort(this.targetPort);

    this.sourcePort = null;
    this.targetPort = null;

    return link;
  }

  public addLink(link: DefaultLinkModel) {
    this.diagramModel.addLink(link);
    this.engine.repaintCanvas();
  }
}



// Object.values(this.getPorts()).forEach((port) => {
//   port.registerListener({
//       selectionChanged: () => {
//           if (port.isSelected() && portType === 'IN' && selectedPorts.sourcePort === null) {
//               selectedPorts.sourcePort = port as DataMapperPortModel;
//               vscode.postMessage({
//                   command: 'success_alert',
//                   text: `Port ${selectedPorts.sourcePort} source port`,
//               });
//           } else if (port.isSelected() && portType === 'OUT' && selectedPorts.targetPort === null) {
//               selectedPorts.targetPort = port as DataMapperPortModel;
//               vscode.postMessage({
//                   command: 'success_alert',
//                   text: `Port ${selectedPorts.targetPort} target port`,
//               });
//           }

//           if (selectedPorts.sourcePort !== null && selectedPorts.targetPort !== null) {
//               if (selectedPorts.sourcePort.canLinkToPort(selectedPorts.targetPort)) {

//                   console.log("sourcePort: ",selectedPorts.sourcePort.getPosition());
//                   console.log("targetport: ",selectedPorts.targetPort.getPosition());
//                   const link = new DataMapperLinkModel();
//                   link.addLabel("new Link");
//                   link.setSourcePort(selectedPorts.sourcePort);
//                   link.setTargetPort(selectedPorts.targetPort);
//                   this.engine.getModel().addLink(link);
//                   this.engine.setModel(this.engine.getModel());
//                   console.log("link added : ", link);
//                   console.log("points : ", link.getPoints());
//                   console.log("link path : ", link.getSVGPath());
//                   selectedPorts.sourcePort.addLinkedPort(selectedPorts.targetPort);
//                   selectedPorts.sourcePort = null;
//                   selectedPorts.targetPort = null;
//               }
//           }
//       }
//   })
// });
