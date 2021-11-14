import TreeItem from "./TreeItem";

export default function TreeRoot(props) {
    const { error, isLoading, treeNodes } = props.treeRootState;
    const handler = props.handler;

    let result = (<div>...</div>);

    if (isLoading) {
        result = (<div>Loading...</div>);
    } else if (error) {
        result = (<div>{error.toString()}</div>);
    } else {
        result = treeNodes.map(treeNode => (
            <TreeItem key={treeNode.id} treeNode={treeNode} handler={handler} />
        ));
    }

    return (
        <div className="form-container">
            {result}
        </div>
    );
};