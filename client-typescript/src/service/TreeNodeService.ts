import Properties from "../../properties"
import { TreeNode } from "../entity/TreeNode";

const REST_GET = "GET";
const REST_PUT = "PUT";
const REST_POST = "POST";
const REST_DELETE = "DELETE";
const HTTP_OK = 200;
const HTTP_REDIRECT = 300;

const BASE_URL = Properties.SERVER_URL;

export default {
    getAllNodes(): Promise<Array<TreeNode>> {
        return _rest("", _getRestOptions(REST_GET));
    },

    getRootNodes(): Promise<Array<TreeNode>> {
        return _rest("root", _getRestOptions(REST_GET));
    },

    getNode(nodeId: number): Promise<TreeNode> {
        return _rest(nodeId.toString(), _getRestOptions(REST_GET));
    },

    getChildren(parentId: number): Promise<Array<TreeNode>> {
        return _rest(parentId.toString() + "/children", _getRestOptions(REST_GET));
    },

    updateNode(node: TreeNode): Promise<TreeNode> {
        return _rest(node.id.toString(), _getRestOptions(REST_PUT, node));
    },

    addNode(node: TreeNode): Promise<TreeNode> {
        return _rest("", _getRestOptions(REST_POST, node));
    },

    deleteNode(nodeId: number): Promise<void> {
        return _rest(nodeId.toString(), _getRestOptions(REST_DELETE));
    },
}

let _rest = function (servlet: string, options: RequestInit): Promise<any> {
    let requestUrl = BASE_URL + servlet;
    console.log(">>> ", requestUrl, options);
    return fetch(requestUrl, options)
        .then(_status)
        .then(_json);
}

let _getRestOptions = function (type: string, body?: any): RequestInit {
    let options: RequestInit = {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
}

let _status = function (response: Response): Promise<Response> {
    if (response.status >= HTTP_OK && response.status < HTTP_REDIRECT) {
        return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
}

let _json = function (response: Response): Promise<any> {
    return response.text().then(function (text: string) {
        return Promise.resolve(text ? JSON.parse(text) : {});
    });
}
