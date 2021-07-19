import React, { Component } from "react";
import { TreeNodeService } from "../../service/TreeNodeService"
import NodeEditView from "./NodeEditView"

class NodeEditPresenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            oldNode: null,
        };
    }

    componentDidMount() {
        if (this.props.nodeId == null) {
            let emptyNode = {
                id: null,
                parentId: this.props.nodeEditData.parentId,
                name: "newNode",
                ip: "127.0.0.0",
                port: 1234
            };
            this.setState({
                isLoaded: true,
                error: null,
                oldNode: emptyNode,
            });
        } else {
            this.sendGetNode(this.props.nodeEditData.nodeId);
        }
    }

    sendGetNode(nodeId) {
        TreeNodeService.getNode(nodeId)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    oldNode: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    oldNode: null,
                });
            });
    }

    onPopupCancel() {
        this.props.onClose();
    }

    onPopupSave(newNode) {
        console.log("onPopupSave: ");

        this.props.onSaved();
    }

    render() {
        const { oldNode } = this.state;
        return <NodeEditView
            node={oldNode}
            onSave={this.onPopupSave.bind(this)}
            onCancel={this.onPopupCancel.bind(this)}
        />
    }
}

export default NodeEditPresenter;


