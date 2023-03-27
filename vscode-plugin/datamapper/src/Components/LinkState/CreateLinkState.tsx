import { KeyboardEvent, MouseEvent } from 'react';
import { Action, ActionEvent, InputType, State } from '@projectstorm/react-canvas-core';
import { DiagramEngine, LinkModel, PortModel } from '@projectstorm/react-diagrams-core';
import DataMapperPortModel from '../Port/DataMapperPort/DataMapperPortModel';
import { DataMapperLinkModel } from './../Link/Model/DataMapperLinkModel';

export class CreateLinkState extends State<DiagramEngine> {
    sourcePort!: PortModel | undefined;
    link!: LinkModel;

    constructor() {
        super({ name: 'create-new-link' });

        this.registerAction(
            new Action({
                type: InputType.MOUSE_UP,
                fire: (actionEvent: ActionEvent<MouseEvent>) => {
                    const element = this.engine.getActionEventBus().getModelForEvent(actionEvent);

                    if (element instanceof PortModel && !this.sourcePort) {
                        if (element instanceof DataMapperPortModel) {
                            if (element.portType === "IN") {
                                this.sourcePort = element;
                                element.fireEvent({}, "mappingStartedFrom");
                                element.linkedPorts.forEach((linkedPort) => {
                                    linkedPort.fireEvent({}, "disableNewLinking")
                                })
                                const link = this.sourcePort.createLinkModel();
                                console.log("Link instance created:");
                                if (link) {
                                    link.setSourcePort(this.sourcePort);
                                    this.link = link;
                                }

                            } else {
                                element.fireEvent({}, "mappingStartedTo");
                                this.clearState();
                                this.eject();
                            }
                        }
                    } else if (element instanceof PortModel && this.sourcePort && element !== this.sourcePort) {
                        if (element instanceof DataMapperPortModel){
                            if (element.portType === "OUT") {
                                element.fireEvent({}, "mappingFinishedTo");
                                if (this.sourcePort.canLinkToPort(element)) {
                                    this.link.setTargetPort(element);
                                    console.log("link added to diagram");
                                    this.engine.getModel().addAll(this.link)
                                    console.log("link in state: ",this.engine.getModel().getLinks());
                                    if (this.sourcePort instanceof DataMapperPortModel) {
                                        this.sourcePort.linkedPorts.forEach((linkedPort) => {
                                            linkedPort.fireEvent({}, "enableNewLinking")
                                        })
                                    }
                                    this.clearState();
                                    this.eject();
                                }
                            } else {
                                this.sourcePort.fireEvent({}, "link-unselected");
                                if (this.sourcePort instanceof DataMapperPortModel) {
                                    this.sourcePort.linkedPorts.forEach((linkedPort) => {
                                        linkedPort.fireEvent({}, "enableNewLinking")
                                    })
                                }
                                this.sourcePort.removeLink(this.link);
                                this.sourcePort = element;
                                this.link.setSourcePort(element);
                                element.fireEvent({}, "mappingStartedFrom");
                                if (element instanceof DataMapperPortModel) {
                                    element.linkedPorts.forEach((linkedPort) => {
                                        linkedPort.fireEvent({}, "disableNewLinking")
                                    })
                                }
                            }
                        }
                    } else if (element === this.link.getLastPoint()) {
                        this.link.point(0, 0, -1);
                    } else if (element === this.sourcePort) {
                        element.fireEvent({}, "mappingStartedFromSelectedAgain");
                        if (element instanceof DataMapperPortModel) {
                            element.linkedPorts.forEach((linkedPort) => {
                                linkedPort.fireEvent({}, "enableNewLinking")
                            })
                        }
                        this.link.remove();
                        this.clearState();
                        this.eject();
                    }

                    this.engine.repaintCanvas();
                }
            })
        );

        this.registerAction(
            new Action({
                type: InputType.MOUSE_MOVE,
                fire: () => {
                    if (!this.link) return;
                    this.engine.repaintCanvas();
                }
            })
        );

        this.registerAction(
            new Action({
              type: InputType.KEY_UP,
              fire: (actionEvent: ActionEvent<KeyboardEvent>) => {
                if (actionEvent.event.key === 'Delete') {
                  const selectedEntities = this.engine.getModel().getSelectedEntities();
                  console.log("link removed");
                  selectedEntities.forEach(entity => {
                    if (entity instanceof DataMapperLinkModel) {
                      entity.remove();
                    }
                  });
                  
                  this.clearState();
                  this.eject();
                  this.engine.repaintCanvas();
                }
              }
            })
          );            
        
    }

    clearState() {
        this.sourcePort = undefined;
    }
}
