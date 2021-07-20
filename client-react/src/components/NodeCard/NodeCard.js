import React, { Component } from "react";
import { TreeNodeService } from "../../service/TreeNodeService"
import NodeCardTable from "./NodeCardTable"
import NodeCardUI from "./NodeCardUI"
import styles from '../../styles/NodeCard.module.css';

class NodeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            error: null,
            node: null,
        };
    }

    componentDidUpdate(prevProp) {
        if (this.props.dataNodeCard.needUpdate && !prevProp.dataNodeCard.needUpdate) {

            if (this.props.dataNodeCard.selectedNodeId == null) {
                this.setState({
                    isLoaded: true,
                    error: null,
                    node: null,
                });
                this.props.handler.onLoaded();
                return;
            }

            TreeNodeService.getNode(this.props.dataNodeCard.selectedNodeId)
                .then(result => {
                    this.setState({
                        isLoaded: true,
                        error: null,
                        node: result,
                    });
                    this.props.handler.onLoaded();
                })
                .catch(error => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                        node: null,
                    });
                    this.props.handler.onLoaded();
                });
        }
    }

    render() {
        const { error, isLoaded, node } = this.state;
        let data;

        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else if (node == null) {
            data = (<div>Not selected.</div>);
        } else {
            data = (
                <div>
                    <NodeCardTable nodeInfo={node} />
                    <NodeCardUI nodeId={node.id} handler={this.props.handler} />
                </div>
            );
        }

        return (
            <div className={styles.box}>
                {data}
            </div>
        );
    }
}

export default NodeCard;
