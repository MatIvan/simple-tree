import React from "react";
import Controller from "./controller/Controller"
import TreeRoot from "./view/TreeRoot";
import AllNodesTable from "./view/AllNodesTable"

function App() {

  const [treeRootState, setTreeRootState] = React.useState(Controller.treeRootState);
  Controller.onTreeRootStateChanged = setTreeRootState;

  const [allNodesTableState, setAllNodesTableState] = React.useState(Controller.allNodesTableState);
  Controller.onAllNodesTableStateChanged = setAllNodesTableState;

  return (
    <div>
      <h1>Client React Tree</h1>
      <h2>Tree:</h2>
      <TreeRoot treeRootState={treeRootState} handler={Controller.getHandler()} />
      <h2>All nodes:</h2>
      <AllNodesTable allNodesTableState={allNodesTableState} handler={Controller.getHandler()} />
    </div>
  );
}


export default App;
