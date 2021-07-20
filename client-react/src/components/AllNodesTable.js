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
        this.sendGetAllNodes();
    }

    componentDidUpdate(pervProps) {
        if (this.props.dataAllNodesTable.needUpdate && !pervProps.dataAllNodesTable.needUpdate) {
            this.sendGetAllNodes();
        }
    }

    sendGetAllNodes() {
        TreeNodeService.getAllNodes()
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    nodes: result,
                });
                this.props.onLoaded();
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    nodes: [],
                });
                this.props.onLoaded();
            });
    }

    render() {
        const { error, isLoaded, nodes } = this.state;
        let data;

        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else {
            data = (
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
            );
        }

        return (
            <div className={styles.tableBox}>
                {data}
            </div>
        );
    }
}

export default AllNodesTable;
