import '../../style/all-nodes-table.css';
import { UIElement } from "../../ui/ui-element";
import { UIVerticalPanel } from "../../ui/ui-vertical-panel";
import { AllNodesTableViewData } from './all-nodes-table-view-data';

const STYLE_MAIN = "all-nodes-table";

export class AllNodesTableView extends UIVerticalPanel {

    constructor() {
        super(STYLE_MAIN);
    }

    setData(data: AllNodesTableViewData) {

    }
}