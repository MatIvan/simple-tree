import { TreeNode } from '../../entity/tree-node';
import '../../style/all-nodes-table.css';
import { UILabel } from '../../ui/ui-label';
import { UITable, UITableTD, UITableTR } from '../../ui/ui-table';
import { UIVerticalPanel } from "../../ui/ui-vertical-panel";

const STYLE_MAIN = "all-nodes-table";

export class AllNodesTableView extends UIVerticalPanel {

    constructor() {
        super(STYLE_MAIN);
    }

    private _makeTable(data: Array<TreeNode>): UITable {
        let table = new UITable();
        table.add(this._makeHead());
        data.forEach(node => {
            table.add(this._makeRow(node));
        });
        return table;
    }

    private _makeHead() {
        let row = new UITableTR();
        row.add(new UITableTD("id"));
        row.add(new UITableTD("parentId"));
        row.add(new UITableTD("name"));
        row.add(new UITableTD("ip"));
        row.add(new UITableTD("port"));
        return row;
    }

    private _makeRow(node: TreeNode): UITableTR {
        let row = new UITableTR();
        row.add(new UITableTD(this._toString(node.id)));
        row.add(new UITableTD(this._toString(node.parentId)));
        row.add(new UITableTD(this._toString(node.name)));
        row.add(new UITableTD(this._toString(node.ip)));
        row.add(new UITableTD(this._toString(node.port)));
        return row;
    }

    private _toString(obj: any): string {
        if (obj === null) {
            return "null";
        }
        return obj.toString();
    }

    setData(data: Array<TreeNode>) {
        this.clear();
        this.add(this._makeTable(data));
    }

    setError(error: Error) {
        this.clear();
        this.add(new UILabel("Error: " + error.message));
    }

    setLoading() {
        this.clear();
        this.add(new UILabel("Loading..."));
    }
}