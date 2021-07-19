import React, { Component } from "react";
import styles from '../../styles/NodeCardTable.module.css';

class NodeCardTable extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { nodeInfo } = this.props;
        if (nodeInfo == null) {
            return (<div>Not selected.</div>);
        }
        return (
            <div>
                <div className={styles.caption}>Selected node: </div>
                <table className={styles.tableNode}>
                    <tbody>
                        <tr>
                            <td className={styles.fieldName}>id</td>
                            <td>{nodeInfo.id}</td>
                        </tr>
                        <tr>
                            <td className={styles.fieldName}>parentId</td>
                            <td>{nodeInfo.parentId}</td>
                        </tr>
                        <tr>
                            <td className={styles.fieldName}>name</td>
                            <td>{nodeInfo.name}</td>
                        </tr>
                        <tr>
                            <td className={styles.fieldName}>ip</td>
                            <td>{nodeInfo.ip}</td>
                        </tr>
                        <tr>
                            <td className={styles.fieldName}>port</td>
                            <td>{nodeInfo.port}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NodeCardTable;
