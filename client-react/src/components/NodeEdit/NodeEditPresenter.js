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
        if (this.props.dataNodeEdit.nodeId == null) {
            let emptyNode = {
                id: null,
                parentId: this.props.dataNodeEdit.parentId,
                name: "newNode",
                ip: "127.0.0.0",
                port: 1234
            };
            this.setState({
                isLoaded: true,
                error: null,
                oldNode: emptyNode,
                caption: "Add new node:"
            });
        } else {
            this.sendGetNode(this.props.dataNodeEdit.nodeId);
        }
    }

    sendGetNode(nodeId) {
        TreeNodeService.getNode(nodeId)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    oldNode: result,
                    caption: "Edit node:"
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    oldNode: null,
                    caption: "Edit node:"
                });
            });
    }

    sendUpdateNode(node) {
        TreeNodeService.updateNode(node)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    oldNode: result,
                });
                this.props.onSaved(result.id);
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    oldNode: null,
                });
            });
    }

    sendAddNode(node) {
        TreeNodeService.addNode(node)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    oldNode: result,
                });
                this.props.onSaved(result.parentId);
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
        if (newNode.id == null) {
            this.sendAddNode(newNode);
        } else {
            this.sendUpdateNode(newNode);
        }
    }

    render() {
        const { error, isLoaded, oldNode, caption } = this.state;
        let data;
        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else if (oldNode == null) {
            data = (<div>Data is null.</div>);
        } else {
            data = (<NodeEditView
                caption={caption}
                node={oldNode}
                onSave={this.onPopupSave.bind(this)}
                onCancel={this.onPopupCancel.bind(this)}
            />)
        }
        return (data);
    }
}

export default NodeEditPresenter;


