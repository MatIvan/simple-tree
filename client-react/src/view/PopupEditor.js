import React from "react";
import { Events } from "../controller/Events";

function _validForText(node) {
    return {
        id: _nullToDefault(node.id, "null"),
        parentId: _nullToDefault(node.parentId, "null"),
        name: _nullToDefault(node.name, "node name"),
        ip: _nullToDefault(node.ip, "0.0.0.0"),
        port: _nullToDefault(node.port, "0"),
    }
}

function _nullToDefault(val, def) {
    return (val === undefined || val === null) ? def : val;
}

function _emptyToNull(val) {
    return (val === "null" || val === "") ? null : val
}

function _validForObject(node) {
    return {
        id: _emptyToNull(node.id),
        parentId: _emptyToNull(node.parentId),
        name: _emptyToNull(node.name),
        ip: _emptyToNull(node.ip),
        port: _emptyToNull(node.port),
    }
}

export default function PopupEditor(props) {
    const { node } = props.popupEditorState;
    const handler = props.handler;
    const [stateNode, setStateNode] = React.useState(() => { return _validForText(node); });

    function _input(e) {
        const { name, value } = e.target;
        setStateNode({
            ...stateNode,
            [name]: value
        });
    };

    return (
        <div className="PopupEditor">
            <div className="form-container PopupEditor-content">
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td><input name="id" value={stateNode.id} disabled={true} onChange={_input} /></td>
                        </tr>
                        <tr>
                            <td>parentId</td>
                            <td><input name="parentId" value={stateNode.parentId} disabled={true} onChange={_input} /></td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td><input name="name" value={stateNode.name} onChange={_input} /></td>
                        </tr>
                        <tr>
                            <td>ip</td>
                            <td><input name="ip" value={stateNode.ip} onChange={_input} /></td>
                        </tr>
                        <tr>
                            <td>port</td>
                            <td><input name="port" value={stateNode.port} onChange={_input} /></td>
                        </tr>
                    </tbody>
                </table>

                <div className="PopupEditor-ui">
                    <button
                        onClick={() => handler(Events.onPopupEditorSaveClicked, _validForObject(stateNode))}
                        className="UIPanelContainer_child">Save</button>
                    <button
                        onClick={() => handler(Events.onPopupEditorCancelClicked)}
                        className="UIPanelContainer_child">Cancel</button>
                </div>

            </div>
        </div>
    );
};