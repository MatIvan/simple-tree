import "./common.less";
import { AllNodesTableView } from "./allNodesTable/AllNodesTableView";
import { AllNodesTablePresenter } from "./allNodesTable/AllNodesTablePresenter";
import { TreeView } from "./tree/TreeView";
import { TreePresenter } from "./tree/TreePresenter";
import { EditFormPresenter } from "./editForm/EditFormPresenter";
import { EditFormView } from "./editForm/EditFormView";

console.log("Demo tree client TypeScript");

let allNodesTableView = new AllNodesTableView();
let allNodesTablePresenter = new AllNodesTablePresenter(allNodesTableView);
document.getElementById("allNodesTableContainer").appendChild(allNodesTableView.getRootElement());
allNodesTablePresenter.update();

let editFormView = new EditFormView();
let editFormPresenter = new EditFormPresenter(editFormView);
document.getElementById("editFormContainer").appendChild(editFormView.getRootElement());

let treeView = new TreeView();
let treePresenter = new TreePresenter(treeView);
document.getElementById("treeContainer").appendChild(treeView.getRootElement());
treePresenter.setOnSelect(nodeId => {
    editFormPresenter.setNode(nodeId);
});
treePresenter.update();

editFormPresenter.setOnUpdate((node) => {
    treePresenter.update(node);
    allNodesTablePresenter.update(node);
});

editFormPresenter.setOnDelete(node => {
    treePresenter.delete(node);
    allNodesTablePresenter.update(node);
});
