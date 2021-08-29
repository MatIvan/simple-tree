import '../style/main-widget.css';
import { Widget } from '../ui/Widget';

import { AllNodesTablePresenter } from './all_nodes_table/AllNodesTablePresenter';
import { AllNodesTableView } from './all_nodes_table/AllNodesTableView';
import { NodesTreePresenter } from './nodes_tree/NodesTreePresenter';
import { NodesTreeView } from './nodes_tree/NodesTreeView';

const STYLE_MAIN = "main-widget";

export class MainWidget extends Widget {
    private _allNodesTable: AllNodesTablePresenter;
    private _tree: NodesTreePresenter;

    constructor() {
        super(STYLE_MAIN);
        this._build();
        this._bind();
    }

    private _build() {
        //NodesTree
        let treeView = new NodesTreeView();
        this.add(treeView);
        this._tree = new NodesTreePresenter(treeView);

        //AllNodesTable
        let viewTable = new AllNodesTableView();
        this.add(viewTable);
        this._allNodesTable = new AllNodesTablePresenter(viewTable);

    }

    private _bind() {
        this._tree.onSelected = (nodeId) => {
            //TODO
        };
    }

    update() {
        this._allNodesTable.update();
        this._tree.loadRootNodes();
    }

}
