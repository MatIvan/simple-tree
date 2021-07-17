class TreeNodeServiceImpl {

    constructor() {
        this.baseUrl = "http://localhost:8181/v1/nodes/";
    }

    getAll() {
        return this._rest("", this._getRestOptions('GET'));
    }


    _rest(servlet, options) {
        let requestUrl = this.baseUrl + servlet;
        return fetch(requestUrl, options)
            .then(this._status)
            .then(this._json)
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
        };
    }

    _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    _json(response) {
        return response.json()
    }

    _onRestError(error) {
        return Promise.reject(new Error(error))
    }
}

export const TreeNodeService = new TreeNodeServiceImpl();