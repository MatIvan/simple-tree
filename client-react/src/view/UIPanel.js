import { Events } from "../controller/Events";

export default function UIPanel(props) {
    const { selectedNodeId } = props.uiPanelState;
    const handler = props.handler;

    const hasNoSelectedNode = selectedNodeId === undefined;

    return (
        <>
            <button
                onClick={() => handler(Events.onAddRootNodeClicked)}
                className="UIPanelContainer_child">Add root node</button>

            <button
                onClick={() => handler(Events.onAddNodeClicked, selectedNodeId)}
                className="UIPanelContainer_child"
                disabled={hasNoSelectedNode}>Add child</button>

            <button
                onClick={() => handler(Events.onEditNodeClicked, selectedNodeId)}
                className="UIPanelContainer_child"
                disabled={hasNoSelectedNode}>Edit</button>

            <button
                onClick={() => handler(Events.onDeleteNodeClicked, selectedNodeId)}
                className="UIPanelContainer_child"
                disabled={hasNoSelectedNode}>Delete</button>

            <div
                className="UIPanelContainer_child">selected node id={selectedNodeId}</div>
        </>
    );
}
