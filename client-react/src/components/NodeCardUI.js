import React, { Component } from "react";
import styles from '../styles/NodeCardUI.module.css';

class NodeCardUI extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.box}>
                <button >Add child</button>
                <button >Edit node</button>
                <button >Delete</button>
            </div>
        );
    }
}

export default NodeCardUI;
