import '../style/main-widget.css';
import { Widget } from '../ui/Widget';

import { AllNodesTablePresenter } from './all_nodes_table/AllNodesTablePresenter';
import { AllNodesTableView } from './all_nodes_table/AllNodesTableView';

const STYLE_MAIN = "main-widget";

export class MainWidget extends Widget {
    private _allNodesTable: AllNodesTablePresenter;

    constructor() {
        super(STYLE_MAIN);

        let view = new AllNodesTableView();
        this.add(view);
        this._allNodesTable = new AllNodesTablePresenter(view);


        this._allNodesTable.update();
    }

}
