import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import Tree from "./Tree"
import NodeCard from "./NodeCard"
import styles from '../styles/TreeNodes.module.css';

class TreeNodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            nodes: [],
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className={styles.box}>
                <Tree />
                <NodeCard />
            </div>
        );
    }
}

export default TreeNodes;
