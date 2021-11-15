export default function SelectedNodeForm(props) {

    const { error, selectedNode } = props.selectedNodeFormState;

    let result = (<div>...</div>);

    if (error) {
        result = (<div>{error.toString()}</div>);
    } else if (selectedNode === undefined) {
        result = (<div>no selection</div>);
    } else {
        result = (
            <table>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>{selectedNode.id}</td>
                    </tr>
                    <tr>
                        <td>parentId</td>
                        <td>{selectedNode.parentId}</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>{selectedNode.name}</td>
                    </tr>
                    <tr>
                        <td>ip</td>
                        <td>{selectedNode.ip}</td>
                    </tr>
                    <tr>
                        <td>port</td>
                        <td>{selectedNode.port}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <div className="form-container">
            {result}
        </div>
    );
}