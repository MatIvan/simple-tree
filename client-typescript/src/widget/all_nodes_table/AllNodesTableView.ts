import '../../style/all-nodes-table.css';
import { TreeNode } from '../../entity/TreeNode';
import { Widget } from '../../ui/Widget';
import { UIFabric } from '../../ui/UIFabric';

const STYLE_MAIN = "all-nodes-table";

export class AllNodesTableView extends Widget {

    private _updateBtn: HTMLButtonElement;

    constructor() {
        super(STYLE_MAIN);
        this._updateBtn = UIFabric.getButton("Update");
    }

    private _makeTable(data: Array<TreeNode>): HTMLTableElement {
        let table = UIFabric.getTable();
        this._makeHead(table);
        let body = table.createTBody();
        data.forEach(node => {
            this._makeRow(body, node);
        });
        return table;
    }

    private _makeHead(table: HTMLTableElement) {
        let hRow = table.createTHead().insertRow();
        hRow.insertCell().innerText = "id";
        hRow.insertCell().innerText = "parentId";
        hRow.insertCell().innerText = "name";
        hRow.insertCell().innerText = "ip";
        hRow.insertCell().innerText = "port";
    }

    private _makeRow(body: HTMLTableSectionElement, node: TreeNode) {
        let bRow = body.insertRow();
        bRow.insertCell().innerText = String(node.id);
        bRow.insertCell().innerText = String(node.parentId);
        bRow.insertCell().innerText = node.name;
        bRow.insertCell().innerText = node.ip;
        bRow.insertCell().innerText = String(node.port);
    }

    clear() {
        super.clear();
        this.add(this._updateBtn);
    }

    setData(data: Array<TreeNode>) {
        this.clear();
        this.add(this._makeTable(data));
    }

    setError(error: Error) {
        this.clear();
        this.add(UIFabric.getLabel("Error: " + error.message));
    }

    setLoading() {
        this.clear();
        this.add(UIFabric.getLabel("Loading..."));
    }

    setUpdateBtnHandler(handler: (ev: MouseEvent) => any) {
        this._updateBtn.onclick = handler;
    }
}