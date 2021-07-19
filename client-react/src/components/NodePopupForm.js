import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/NodePopupForm.module.css';

class NodePopupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newNode: null
        }
    }

    componentDidMount() {
        if(this.props.nodeId==null){
            //new node with: this.props.parentId
        }else{
            this.sendRequest(this.props.nodeId);
        }
    }

    sendRequest(nodeId){

    }

    render() {
        const { newNode } = this.state;
        return (
            <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>Edit node:</h1>

                    <div className={styles.boxUI}>
                        <button onClick={() => this.props.onSave(newNode)}>Save</button>
                        <button onClick={() => this.props.onCancel()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NodePopupForm;


