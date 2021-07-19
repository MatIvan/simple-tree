class TreeNodeServiceImpl {

    constructor() {
        this.baseUrl = "http://localhost:8181/v1/nodes/";
    }

    getAllNodes() {
        return this._rest("", this._getRestOptions('GET'));
    }

    getRootNodes() {
        return this._rest("root", this._getRestOptions('GET'));
    }

    getNode(nodeId) {
        return this._rest(nodeId, this._getRestOptions('GET'));
    }

    getChildren(parentId) {
        return this._rest(parentId + "/children", this._getRestOptions('GET'));
    }

    updateNode(node) {
        return this._rest(node.id, this._getRestOptions('PUT', node));
    }

    addNode(node) {
        return this._rest("", this._getRestOptions('POST', node));
    }

    deleteNode(nodeId) {
        return this._rest(nodeId, this._getRestOptions('DELETE'));
    }

    _rest(servlet, options) {
        let requestUrl = this.baseUrl + servlet;
        console.log(">>> ", requestUrl, options);
        return fetch(requestUrl, options)
            .then(this._status)
            .then(this._json)
            .then(this._log)
            .catch(this._onRestError);
    }

    _getRestOptions(type, body) {
        let options = {
            method: type,                   // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                   // no-cors, *cors, same-origin
            cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit',            // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',             // manual, *follow, error
            referrerPolicy: 'no-referrer'  // no-referrer, *client
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        return options;
    }

    _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    _json(response) {
        return response.text().then(function (text) {
            return text ? JSON.parse(text) : {}
        });
    }

    _log(response) {
        console.log("<<< ", response);
        return Promise.resolve(response);
    }

    _onRestError(error) {
        return Promise.reject(new Error(error))
    }
}

export const TreeNodeService = new TreeNodeServiceImpl();