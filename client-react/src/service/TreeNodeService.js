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

    _rest(servlet, options) {
        let requestUrl = this.baseUrl + servlet;
        console.log(">>> ", requestUrl, options);
        return fetch(requestUrl, options)
            .then(this._status)
            .then(this._json)
            .then(this._log)
            .catch(this._onRestError);
    }

    _getRestOptions(type) {
        return {
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
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        };
    }

    _status(response) {
        console.log("<<< ", response);
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    _json(response) {
        return response.json()
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