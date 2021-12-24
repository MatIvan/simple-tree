import "./style.less";
import { TreeNode } from "../entity/TreeNode";

const STYLE = {
    MAIN: "AllNodesTableView",
}

export default class {

    private _table: HTMLTableElement;

    constructor() {
        this._table = document.createElement("table") as HTMLTableElement;
        this._table.classList.add(STYLE.MAIN);
        this._createHeader();

    }

    private _createHeader() {
        let headRow = this._table.createTHead().insertRow();
        headRow.insertCell().innerText = "id";
        headRow.insertCell().innerText = "parentId";
        headRow.insertCell().innerText = "name";
        headRow.insertCell().innerText = "ip";
        headRow.insertCell().innerText = "port";
    }

    private _clear(): void {
        while (this._table.rows.length > 1) {
            this._table.deleteRow(1);
        }
    }

    getRootElement(): HTMLElement {
        return this._table;
    }

    setData(nodes: TreeNode[]): void {
        this._clear();
        let body = this._table.createTBody();
        nodes.forEach(node => {
            let row = body.insertRow();
            row.insertCell().innerText = String(node.id);
            row.insertCell().innerText = String(node.parentId);
            row.insertCell().innerText = node.name;
            row.insertCell().innerText = node.ip;
            row.insertCell().innerText = String(node.port);
        });
    }

    setMessage(msg: string): void {
        this._clear();
        this._table.insertRow().insertCell().innerText = msg;
    }
}
