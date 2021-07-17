import React, { Component } from "react";
import AllNodesTable from "./AllNodesTable"

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>TreeNode client</h1>
                <AllNodesTable />
            </div>
        );
    }
}

export default App;
