import { NodeEntity } from "../entity/node-entity";

class TreeNodeServiceImpl {

    private _baseUrl = "http://localhost:8181/v1/nodes/";

    constructor() {

    }

    getAllNodes(): Promise<Response> {
        return this._rest("", this._getRestOptions('GET'));
    }

    getRootNodes(): Promise<Response> {
        return this._rest("root", this._getRestOptions('GET'));
    }

    getNode(nodeId: number): Promise<Response> {
        return this._rest(nodeId.toString(), this._getRestOptions('GET'));
    }

    getChildren(parentId: number): Promise<Response> {
        return this._rest(parentId.toString() + "/children", this._getRestOptions('GET'));
    }

    updateNode(node: NodeEntity): Promise<Response> {
        return this._rest(node.id.toString(), this._getRestOptions('PUT', node));
    }

    addNode(node: NodeEntity): Promise<Response> {
        return this._rest("", this._getRestOptions('POST', node));
    }

    deleteNode(nodeId: number): Promise<Response> {
        return this._rest(nodeId.toString(), this._getRestOptions('DELETE'));
    }

    private _rest(servlet: string, options: RequestInit): Promise<Response> {
        let requestUrl = this._baseUrl + servlet;
        console.log(">>> ", requestUrl, options);
        return fetch(requestUrl, options)
            .then(this._status)
            .then(this._json)
            .then(this._log)
            .catch(this._onRestError);
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

    private _json(response: Response): Promise<Response> {
        return response.text().then(function (text) {
            return text ? JSON.parse(text) : {}
        });
    }

    private _log(response: Response): Promise<Response> {
        console.log("<<< ", response);
        return Promise.resolve(response);
    }

    private _onRestError(error: string) {
        return Promise.reject(new Error(error))
    }
}

export const TreeNodeService = new TreeNodeServiceImpl();