import { TreeNode } from '../../entity/tree-node';
import '../../style/all-nodes-table.css';
import { UIElement } from "../../ui/ui-element";
import { UIVerticalPanel } from "../../ui/ui-vertical-panel";

const STYLE_MAIN = "all-nodes-table";

export class AllNodesTableView extends UIVerticalPanel {

    constructor() {
        super(STYLE_MAIN);
    }

    setData(data: Array<TreeNode>) {

    }

    setError(error: Error) {

    }

    setLoading() {

    }
}