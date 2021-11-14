class Model {

    constructor() {
        this.allNodes = [];
        this.tree = [];
        this.expandedNodesId = [];
        this.selectedNodeId = undefined;
    }

    _makeTreeNode(node) {
        return {
            ...node,
            expanded: this.expandedNodesId.includes(node.id),
            selected: this.selectedNodeId === node.id,
            children: [],
        }
    }

    _getById(nodeId, nodes) {
        for (let node of nodes) {
            if (node.id === nodeId) {
                return node;
            }
            if (node.children) {
                let n = this._getById(nodeId, node.children);
                if (n) {
                    return n;
                }
            }
        }
        return undefined;
    }

    _getTreeNode(nodeId) {
        return this._getById(nodeId, this.tree);
    }

    setRootNodes(nodes) {
        this.expandedNodesId = [];
        this.selectedNodeId = undefined;
        this.tree = nodes.map(node => this._makeTreeNode(node));
    }

    getRootTreeNodes() {
        return this.tree;
    }

    selectItem(nodeId) {
        let oldNode = this._getTreeNode(this.selectedNodeId);
        if (oldNode) {
            oldNode.selected = false;
        }
        this.selectedNodeId = nodeId;
        let newNode = this._getTreeNode(this.selectedNodeId);
        if (newNode) {
            newNode.selected = true;
        }
    }

    togleItem(nodeId) {
        let oldNode = this._getTreeNode(nodeId);
        oldNode.expanded = !oldNode.expanded;
        if (oldNode.expanded) {
            this.expandedNodesId.push(nodeId);
            return true;
        }

        const index = this.expandedNodesId.indexOf(nodeId);
        if (index > -1) {
            this.expandedNodesId.splice(index, 1);
        }
        oldNode.children = [];
        return false;
    }

    setChildren(parentId, children) {
        let oldNode = this._getTreeNode(parentId);
        oldNode.children = children.map(node => this._makeTreeNode(node));
    }
}

export default new Model();
