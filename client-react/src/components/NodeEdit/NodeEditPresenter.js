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
        if (this.props.nodeEditData.nodeId == null) {
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
                caption: "Add new node:"
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

    onPopupCancel() {
        this.props.onClose();
    }

    onPopupSave(newNode) {
        console.log("onPopupSave: ", newNode);

        this.props.onSaved();
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


