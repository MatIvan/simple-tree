import React from "react";
import Controller from "./controller/Controller"
import TreeRoot from "./view/TreeRoot";
import AllNodesTable from "./view/AllNodesTable"
import SelectedNodeForm from "./view/SelectedNodeForm";
import UIPanel from "./view/UIPanel";

function App() {

  const [treeRootState, setTreeRootState] = React.useState(Controller.treeRootState);
  Controller.onTreeRootStateChanged = setTreeRootState;

  const [allNodesTableState, setAllNodesTableState] = React.useState(Controller.allNodesTableState);
  Controller.onAllNodesTableStateChanged = setAllNodesTableState;

  const [selectedNodeFormState, setSelectedNodeFormState] = React.useState(Controller.selectedNodeFormState);
  Controller.onSelectedNodeFormStateChanged = setSelectedNodeFormState;

  const [uiPanelState, setUIPanelState] = React.useState(Controller.uiPanelState);
  Controller.onUIPanelStateChanged = setUIPanelState;

  return (
    <div>
      <h1>Client React Tree</h1>
      <div className="TreeAndSelectionContainer">
        <div className="TreeAndSelectionContainer_child">
          <b>Tree:</b>
          <TreeRoot treeRootState={treeRootState} handler={Controller.getHandler()} />
        </div>
        <div className="TreeAndSelectionContainer_child">
          <b>Selected:</b>
          <SelectedNodeForm selectedNodeFormState={selectedNodeFormState} />
        </div>
      </div>
      <br />
      <div className="UIPanelContainer form-container">
        <UIPanel uiPanelState={uiPanelState} handler={Controller.getHandler()} />
      </div>
      <br />
      <b>All nodes:</b>
      <AllNodesTable allNodesTableState={allNodesTableState} handler={Controller.getHandler()} />
    </div>
  );
}


export default App;
