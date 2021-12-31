import "./common.less";
import AllNodesTableView from "./allNodesTable/AllNodesTableView";
import AllNodesTablePresenter from "./allNodesTable/AllNodesTablePresenter";
import { TreeView } from "./tree/TreeView";
import { TreePresenter } from "./tree/TreePresenter";

console.log("Demo tree client TypeScript");

let allNodesTableView = new AllNodesTableView();
let allNodesTablePresenter = new AllNodesTablePresenter(allNodesTableView);
document.getElementById("allNodesTableContainer").appendChild(allNodesTableView.getRootElement());
allNodesTablePresenter.update();

let treeView = new TreeView();
let treePresenter = new TreePresenter(treeView);
document.getElementById("treeContainer").appendChild(treeView.getRootElement());
treePresenter.update();
