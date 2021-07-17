import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/AllNodesTable.module.css';

class AllNodesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            nodes: [],
        };
    }

    componentDidMount() {
        TreeNodeService.getAll()
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

    render() {
        const { error, isLoaded, nodes } = this.state;
        let data;

        if (error) {
            data = (<div className={styles.tableBox}>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div className={styles.tableBox}>Loading...</div>);
        } else {
            data = (
                <div className={styles.tableBox}>
                    <table className={styles.tableMain}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>parentId</th>
                                <th>name</th>
                                <th>ip</th>
                                <th>port</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map(node => (
                                <tr key={node.id}>
                                    <td>{node.id}</td>
                                    <td>{node.parentId}</td>
                                    <td>{node.name}</td>
                                    <td>{node.ip}</td>
                                    <td>{node.port}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className={styles.tableBox}>
                <h2>All nodes:</h2>
                {data}
            </div>
        );
    }
}

export default AllNodesTable;
