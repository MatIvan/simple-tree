import React, { Component } from "react";
import AllNodesTable from "./AllNodesTable"
import TreeNodes from "./TreeNodes"

import '../styles/App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            needUpdateTime: null
        };
    }

    onDataChanged() {
        this.setState({
            needUpdateTime: Date.now()
        });
    }

    render() {
        return (
            <div>
                <h1>TreeNode client</h1>
                <h2>Tree:</h2>
                <TreeNodes onDataChanged={this.onDataChanged.bind(this)} />
                <h2>All nodes:</h2>
                <AllNodesTable needUpdateTime={this.state.needUpdateTime} />
            </div>
        );
    }
}

export default App;
