import { Events } from "../controller/Events";

export default function TreeItem(props) {
    const { id, name, expanded, selected, children } = props.treeNode;
    const handler = props.handler;

    function onItemClicked() {
        handler(Events.onItemClicked, id);
    }

    function onExpandClicked() {
        handler(Events.onExpandClicked, id);
    }

    let childrenBlock;
    if (children) {
        childrenBlock = children.map(node => (
            <TreeItem key={node.id} treeNode={node} handler={handler} />
        ));
    }

    return (
        <div>
            <div className={"TreeItem" + (selected ? " selected" : "")}>
                <button onClick={onExpandClicked}>{expanded ? "-" : "+"}</button>
                <div className={"TreeItem-name"} onClick={onItemClicked} >{name}({selected ? "*" : "."})</div>
            </div>
            <div className="TreeItem-children">{childrenBlock}</div>
        </div>
    );
};