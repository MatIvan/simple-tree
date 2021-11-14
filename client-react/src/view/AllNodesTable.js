import { events } from "../controller/Controller";

export default function AllNodesTable(props) {
    const { error, isLoading, nodes } = props.allNodesTableState;
    const handler = props.handler;

    let result = (<div>...</div>);

    if (isLoading) {
        result = (<div>Loading...</div>);
    } else if (error) {
        result = (<div>{error.toString()}</div>);
    } else {
        result = (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>parentId</th>
                        <th>name</th>
                        <th>ip</th>
                        <th>port</th>
                    </tr>
                </thead>
                <tbody>
                    {nodes.map(node => (
                        <tr key={node.id}>
                            <td>{node.id}</td>
                            <td>{node.parentId}</td>
                            <td>{node.name}</td>
                            <td>{node.ip}</td>
                            <td>{node.port}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    function onRefreshClicked() {
        handler(events.onRefreshAllNodes);
    }

    return (
        <div>
            <button onClick={onRefreshClicked}>Refresh</button>
            {result}
        </div>
    );
};