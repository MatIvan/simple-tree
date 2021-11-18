import React from "react";
import { Events } from "../controller/Events";

export default function PopupEditor(props) {
    const { node } = props.popupEditorState;
    const handler = props.handler;
    const [stateNode, setStateNode] = React.useState(() => { return node; });

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
                        onClick={() => handler(Events.onPopupEditorSaveClicked, stateNode)}
                        className="UIPanelContainer_child">Save</button>
                    <button
                        onClick={() => handler(Events.onPopupEditorCancelClicked)}
                        className="UIPanelContainer_child">Cancel</button>
                </div>

            </div>
        </div>
    );
};