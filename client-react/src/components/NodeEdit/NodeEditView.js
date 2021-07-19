import React, { Component } from "react";
import { TreeNodeService } from "../../service/TreeNodeService"
import styles from '../../styles/NodeEditView.module.css';

class NodeEditView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>Edit node:</h1>

                    <div className={styles.boxUI}>
                        <button onClick={() => this.props.onSave()}>Save</button>
                        <button onClick={() => this.props.onCancel()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NodeEditView;


