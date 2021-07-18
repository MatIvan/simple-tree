import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/NodeItem.module.css';

class NodeItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            error: null,
            nodes: [],
            isCollapsed: true,
        };
    }

    componentDidMount() {
        //do nothing
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isCollapsed !== this.state.isCollapsed) {
            if (this.state.isCollapsed) {
                this.setState({
                    isLoaded: true,
                    error: null,
                    nodes: [],
                });
            } else {
                this.setState({
                    isLoaded: false,
                    error: null,
                    nodes: [],
                });
                this.sendRequest();
            }
        }
    }

    sendRequest() {
        TreeNodeService.getChildren(this.props.node.id)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    nodes: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    nodes: [],
                });
            });
    }

    onNodeItemClick() {
        const prev = this.state.isCollapsed;
        this.setState({
            isCollapsed: !prev,
        });
        console.log(this.state.isCollapsed);
    }

    render() {
        const { error, isLoaded, nodes } = this.state;
        let data;

        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else {
            data = nodes.map(node => (
                <NodeItem key={node.id} node={node} />
            ));
        }

        const nodeInfo = this.props.node;
        const buttonText = this.state.isCollapsed ? "+" : "-";
        return (
            <div className={styles.box}>
                <div className={styles.infoBox} onClick={() => this.onNodeItemClick()}>
                    <div className={styles.btnCollapse}>{buttonText}</div>
                    <div className={styles.lblName}>{nodeInfo.name}</div>
                </div>
                {data}
            </div>
        );
    }
}

export default NodeItem;
