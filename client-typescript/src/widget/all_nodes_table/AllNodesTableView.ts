import '../../style/all-nodes-table.css';
import { TreeNode } from '../../entity/TreeNode';
import { VerticalPanel } from '../../ui/VerticalPanel';
import { Button } from '../../ui/Button';
import { Table } from '../../ui/Table';
import { Label } from '../../ui/Label';

const STYLE_MAIN = "all-nodes-table";

export class AllNodesTableView extends VerticalPanel {

    private _updateBtn: Button;

    constructor() {
        super();
        this.addStyle(STYLE_MAIN);
        this._updateBtn = new Button("Update");
    }

    private _makeTable(data: Array<TreeNode>): Table {
        let table = new Table();
        this._makeHead(table);
        let body = table.getElement().createTBody();
        data.forEach(node => {
            this._makeRow(body, node);
        });
        return table;
    }

    private _makeHead(table: Table) {
        let hRow = table.getElement().createTHead().insertRow();
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
        this.add(new Label("Error: " + error.message));
    }

    setLoading() {
        this.clear();
        this.add(new Label("Loading..."));
    }

    setUpdateBtnHandler(handler: () => any) {
        this._updateBtn.setOnClickHandler(handler);
    }
}