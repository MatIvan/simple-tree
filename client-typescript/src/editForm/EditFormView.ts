import "./style.less";
import { TreeNode } from "../entity/TreeNode";

const STYLE_MAIN = "EditFormView";
const STYLE = {
    head: STYLE_MAIN + "-head",
    btnCell: STYLE_MAIN + "-btncell",
}


export class EditFormView {

    private _table: HTMLTableElement;
    private _id: HTMLInputElement;
    private _parentId: HTMLInputElement;
    private _name: HTMLInputElement;
    private _ip: HTMLInputElement;
    private _port: HTMLInputElement;

    private _saveBtn: HTMLButtonElement;
    private _onSaveClick: (node: TreeNode) => void;

    constructor() {
        this._createUI();
        this._createTable();
    }

    private _createUI() {
        this._id = document.createElement("input") as HTMLInputElement;
        this._parentId = document.createElement("input") as HTMLInputElement;
        this._name = document.createElement("input") as HTMLInputElement;
        this._ip = document.createElement("input") as HTMLInputElement;
        this._port = document.createElement("input") as HTMLInputElement;

        this._id.disabled = true;
        this._parentId.disabled = true;

        this._saveBtn = document.createElement("button") as HTMLButtonElement;
        this._saveBtn.innerText = "Save";
        this._saveBtn.onclick = () => {
            let node: TreeNode = {
                id: Number(this._id.value),
                parentId: Number(this._parentId.value),
                name: this._name.value,
                ip: this._ip.value,
                port: Number(this._port),
            };
            this._onSaveClick(node);
        };
    }

    private _createTable() {
        this._table = document.createElement("table") as HTMLTableElement;
        this._table.classList.add(STYLE_MAIN);

        this._createRow("id", this._id);
        this._createRow("parentId", this._parentId);
        this._createRow("name", this._name);
        this._createRow("ip", this._ip);
        this._createRow("port", this._port);

        let row = this._table.insertRow();
        row.classList.add(STYLE.btnCell);
        row.insertCell().appendChild(this._saveBtn);
    }

    private _createRow(label: string, element: HTMLElement) {
        let row = this._table.insertRow();
        let headCell = row.insertCell();
        headCell.innerText = label;
        headCell.classList.add(STYLE.head);
        row.insertCell().appendChild(element);
    }

    setNode(node: TreeNode) {
        this._id.value = String(node.id);
        this._parentId.value = String(node.parentId);
        this._name.value = String(node.name);
        this._ip.value = String(node.ip);
        this._port.value = String(node.port);
    }

    getRootElement(): HTMLElement {
        return this._table;
    }

    setOnSaveClick(onSaveClick: (node: TreeNode) => void) {
        this._onSaveClick = onSaveClick;
    }
}
