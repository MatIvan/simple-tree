import '../style/main-widget.css';

import { UILabel } from '../ui/ui-label';
import { UIVerticalPanel } from '../ui/ui-vertical-panel';
import { AllNodesTablePresenter } from './all-nodes-table/all-nodes-table-presenter';
import { AllNodesTableView } from './all-nodes-table/all-nodes-table-view';

const STYLE_MAIN = "main-widget";

export class MainWidget extends UIVerticalPanel {

    _allNodesTable: AllNodesTablePresenter;

    constructor() {
        super(STYLE_MAIN);

        this._allNodesTable = new AllNodesTablePresenter(new AllNodesTableView());
        this._allNodesTable.go(this);
        this._allNodesTable.update();
    }


}
