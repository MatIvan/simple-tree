import "./common.less";
import AllNodesTableView from "./allNodesTable/AllNodesTableView";
import AllNodesTablePresenter from "./allNodesTable/AllNodesTablePresenter";

console.log("Demo tree client TypeScript");

let allNodesTableView = new AllNodesTableView();
let allNodesTablePresenter = new AllNodesTablePresenter(allNodesTableView);

document.getElementById("allNodesTableContainer").appendChild(allNodesTableView.getRootElement());
allNodesTablePresenter.update();
