import React, { Component } from "react";
import AllNodesTable from "./AllNodesTable"
import TreeNodes from "./TreeNodes"

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>TreeNode client</h1>
                <h2>Tree:</h2>
                <TreeNodes/>
                <h2>All nodes:</h2>
                <AllNodesTable />
            </div>
        );
    }
}

export default App;
