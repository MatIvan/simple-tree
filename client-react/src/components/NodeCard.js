import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/NodeCard.module.css';

class NodeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        const { selectedNodeId } = this.props;
        return (
            <div className={styles.box}>
                NodeCard: {selectedNodeId}
            </div>
        );
    }
}

export default NodeCard;
