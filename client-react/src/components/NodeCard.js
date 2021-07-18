import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/NodeCard.module.css';

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
        if (prevProp.selectedNodeId == this.props.selectedNodeId) {
            return;
        }

        if (this.props.selectedNodeId == null) {
            this.setState({
                isLoaded: true,
                error: null,
                node: null,
            });
            return;
        }

        TreeNodeService.getNode(this.props.selectedNodeId)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    node: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    node: null,
                });
            });
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
                    <div className={styles.caption}>Selected node: </div>
                    <table className={styles.tableNode}>
                        <tbody>
                            <tr>
                                <td className={styles.fieldName}>id</td>
                                <td>{node.id}</td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>parentId</td>
                                <td>{node.parentId}</td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>name</td>
                                <td>{node.name}</td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>ip</td>
                                <td>{node.ip}</td>
                            </tr>
                            <tr>
                                <td className={styles.fieldName}>port</td>
                                <td>{node.port}</td>
                            </tr>
                        </tbody>
                    </table>
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
