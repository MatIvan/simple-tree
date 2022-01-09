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
    private _deleteBtn: HTMLButtonElement;
    private _addBtn: HTMLButtonElement;

    private _onSaveClick: (node: TreeNode) => void;
    private _onDeleteClick: (node: TreeNode) => void;
    private _onAddClick: (node: TreeNode) => void;

    constructor() {
        this._createUI();
        this._createButtons();
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
    }

    private _createButtons() {
        this._saveBtn = document.createElement("button") as HTMLButtonElement;
        this._saveBtn.innerText = "Save";
        this._saveBtn.onclick = () => {
            this._onSaveClick(this._getNode());
        };

        this._deleteBtn = document.createElement("button") as HTMLButtonElement;
        this._deleteBtn.innerText = "Delete";
        this._deleteBtn.onclick = () => {
            this._onDeleteClick(this._getNode());
        };

        this._addBtn = document.createElement("button") as HTMLButtonElement;
        this._addBtn.innerText = "Add";
        this._addBtn.onclick = () => {
            this._onAddClick(this._getNode());
        };
    }

    private _getNode(): TreeNode {
        return {
            id: this._getNumber(this._id.value),
            parentId: this._getNumber(this._parentId.value),
            name: this._name.value,
            ip: this._ip.value,
            port: Number(this._port.value),
        };
    }

    private _getNumber(value: string): number {
        let num = Number(value);
        if (!num && num !== 0) {
            num = null;
        }
        return num;
    }

    private _createTable() {
        this._table = document.createElement("table") as HTMLTableElement;
        this._table.classList.add(STYLE_MAIN);

        this._createRow("id", this._id);
        this._createRow("parentId", this._parentId);
        this._createRow("name", this._name);
        this._createRow("ip", this._ip);
        this._createRow("port", this._port);

        let cell = this._table.insertRow().insertCell();
        cell.colSpan = 2;
        cell.classList.add(STYLE.btnCell);
        cell.appendChild(this._addBtn);
        cell.appendChild(this._deleteBtn);
        cell.appendChild(this._saveBtn);
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

    setOnDeleteClick(onDeleteClick: (node: TreeNode) => void) {
        this._onDeleteClick = onDeleteClick;
    }

    setOnAddClick(onAddClick: (node: TreeNode) => void) {
        this._onAddClick = onAddClick;
    }
}
