import React, { Component } from "react";
import styles from '../styles/NodeCardUI.module.css';

class NodeCardUI extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { nodeId, handler } = this.props;
        return (
            <div className={styles.box}>
                <button onClick={() => handler.onAddChild(nodeId)}>Add child</button>
                <button onClick={() => handler.onEdit(nodeId)}>Edit node</button>
                <button onClick={() => handler.onDelete(nodeId)}>Delete</button>
            </div>
        );
    }
}

export default NodeCardUI;
