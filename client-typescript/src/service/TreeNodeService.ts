import { TreeNode } from "../entity/TreeNode";

const REST_GET = "GET";
const REST_PUT = "PUT";
const REST_POST = "POST";
const REST_DELETE = "DELETE";

class TreeNodeServiceImpl {

    private _baseUrl = "http://localhost:8181/v1/nodes/";

    constructor() {

    }

    getAllNodes(): Promise<Array<TreeNode>> {
        return this._rest("", this._getRestOptions(REST_GET));
    }

    getRootNodes(): Promise<Array<TreeNode>> {
        return this._rest("root", this._getRestOptions(REST_GET));
    }

    getNode(nodeId: number): Promise<TreeNode> {
        return this._rest(nodeId.toString(), this._getRestOptions(REST_GET))
            .then(this._toNode);
    }

    getChildren(parentId: number): Promise<Array<TreeNode>> {
        return this._rest(parentId.toString() + "/children", this._getRestOptions(REST_GET));
    }

    updateNode(node: TreeNode): Promise<TreeNode> {
        return this._rest(node.id.toString(), this._getRestOptions(REST_PUT, node))
            .then(this._toNode);
    }

    addNode(node: TreeNode): Promise<TreeNode> {
        return this._rest("", this._getRestOptions(REST_POST, node))
            .then(this._toNode);
    }

    deleteNode(nodeId: number): Promise<void> {
        return this._rest(nodeId.toString(), this._getRestOptions(REST_DELETE));
    }

    private _rest(servlet: string, options: RequestInit): Promise<any> {
        let requestUrl = this._baseUrl + servlet;
        console.log(">>> ", requestUrl, options);
        return fetch(requestUrl, options)
            .then(this._status)
            .then(this._json)
            .then(this._log);
    }

    private _getRestOptions(type: string, body?: any): RequestInit {
        let options: RequestInit = {
            method: type,                   // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                   // no-cors, *cors, same-origin
            cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit',            // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',             // manual, *follow, error
            referrerPolicy: 'no-referrer',  // no-referrer, *client
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return options;
    }

    private _status(response: Response): Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    private _json(response: Response): Promise<any> {
        return response.text().then(function (text: string) {
            return text ? JSON.parse(text) : {}
        });
    }

    private _log(obj: any): Promise<any> {
        console.log("<<< ", obj);
        return Promise.resolve(obj);
    }

    private _toNode(obj: any): Promise<TreeNode> {
        return Promise.resolve(<TreeNode>obj);
    }

    private _toArrayNode(obj: any): Promise<Array<TreeNode>> {
        return Promise.resolve(<Array<TreeNode>>obj);
    }
}

export const TreeNodeService = new TreeNodeServiceImpl();