import React, { Component } from "react";
import AllNodesTable from "./AllNodesTable"
import TreeNodes from "./TreeNodes"

import '../styles/App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataAllNodesTable: {
                needUpdate: true
            }
        };
    }

    onDataChanged() {
        this.setState({
            dataAllNodesTable: {
                needUpdate: true
            }
        });
    }

    onLoadAllNodesTable() {
        this.setState({
            dataAllNodesTable: {
                needUpdate: false
            }
        });
    }

    render() {
        return (
            <div>
                <h1>TreeNode client</h1>
                <h2>Tree:</h2>
                <TreeNodes onDataChanged={this.onDataChanged.bind(this)} />
                <h2>All nodes:</h2>
                <AllNodesTable
                    dataAllNodesTable={this.state.dataAllNodesTable}
                    onLoaded={this.onLoadAllNodesTable.bind(this)} />
            </div>
        );
    }
}

export default App;
