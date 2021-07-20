import React, { Component } from "react";
import { TreeNodeService } from "../../service/TreeNodeService"
import styles from '../../styles/NodeDeleteForm.module.css';

class NodeDeleteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    onDeleteClick() {
        TreeNodeService.deleteNode(this.props.dataDeleteNode.nodeId)
            .then(result => {
                this.setState({
                    error: null
                });
                this.props.onDeleted();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { error } = this.state;
        let message;
        if (error == null) {
            message = (<div>Delete node by id: {this.props.dataDeleteNode.nodeId} ?</div>);
        } else {
            message = (<div>Error: {error.message}</div>)
        }

        return (
            <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>Delete</h1>
                    {message}
                    <div className={styles.buttonsBox}>
                        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
                        <button onClick={() => this.props.onClose()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NodeDeleteForm;


