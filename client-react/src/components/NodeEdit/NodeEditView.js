import React, { Component } from "react";
import { TreeNodeService } from "../../service/TreeNodeService"
import styles from '../../styles/NodeEditView.module.css';

class NodeEditView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            parentId: null,
            name: "null",
            ip: "null",
            port: 0,
        }
    }

    componentDidMount() {
        let node = this.props.node;
        this.setState({
            id: node.id,
            parentId: node.parentId,
            name: node.name,
            ip: node.ip,
            port: node.port,
        });
    }

    onSaveClicked() {
        const { id, parentId, name, ip, port } = this.state;
        const newNodeData = {
            id: id,
            parentId: parentId,
            name: name,
            ip: ip,
            port: port,
        }
        this.props.onSave(newNodeData);
    }

    onChange(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        this.setState({ [fieldName]: value });
    }

    render() {
        const { id, parentId, name, ip, port } = this.state;

        return (
            <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>{this.props.caption}</h1>

                    <table className={styles.tableNode}>
                        <tbody>
                            <tr>
                                <td className={styles.fieldName}>id</td>
                                <td><input readonly disabled type="text" value={id} /></td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>parentId</td>
                                <td><input readonly disabled type="text" value={parentId} /></td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>name</td>
                                <td><input name="name" type="text" onChange={this.onChange.bind(this)} value={name} /></td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>ip</td>
                                <td><input name="ip" type="text" onChange={this.onChange.bind(this)} value={ip} /></td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>port</td>
                                <td><input name="port" type="text" onChange={this.onChange.bind(this)} value={port} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.buttonsBox}>
                        <button onClick={this.onSaveClicked.bind(this)}>Save</button>
                        <button onClick={() => this.props.onCancel()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NodeEditView;


