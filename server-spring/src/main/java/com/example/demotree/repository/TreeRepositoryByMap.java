package com.example.demotree.repository;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.example.demotree.entity.TreeNode;

@Repository
@Qualifier("TreeRepositoryByMap")
public class TreeRepositoryByMap implements TreeRepository {

    private Integer lastId = 0;
    private ConcurrentHashMap<Integer, TreeNode> treeMap;

    @PostConstruct
    public void constructor() {
        treeMap = new ConcurrentHashMap<Integer, TreeNode>();
        insert(new TreeNode(null, null, "rootNode", "127.0.0.1", 1111));
        insert(new TreeNode(null, 0, "node-1", "127.0.1.1", 11));
        insert(new TreeNode(null, 0, "node-2", "127.0.1.2", 12));
    }

    private Integer nextId() {
        return lastId++;
    }

    @Override
    public List<TreeNode> getRoot() {
        return treeMap.values().stream()
                .filter(TreeNode::isParent)
                .collect(Collectors.toList());
    }

    @Override
    public TreeNode getNode(Integer id) {
        return treeMap.get(id);
    }

    @Override
    public List<TreeNode> getAll() {
        return treeMap.values().stream()
                .collect(Collectors.toList());
    }

    @Override
    public List<TreeNode> getChildren(final Integer parentId) {
        return treeMap.values().stream()
                .filter(node -> Objects.equals(parentId, node.getParentId()))
                .collect(Collectors.toList());
    }

    @Override
    public void insert(TreeNode treeNode) {
        treeNode.setId(nextId());
        treeMap.put(treeNode.getId(), treeNode);
    }

    @Override
    public void update(TreeNode treeNode) {
        Objects.requireNonNull(treeNode.getId());

        TreeNode actualTreeNode = treeMap.get(treeNode.getId());
        Objects.requireNonNull(actualTreeNode);

        actualTreeNode.setParentId(treeNode.getParentId());
        actualTreeNode.setIp(treeNode.getIp());
        actualTreeNode.setName(treeNode.getName());
        actualTreeNode.setPort(treeNode.getPort());
    }

    @Override
    public void delete(final Integer id) {
        treeMap.remove(id);
        List<TreeNode> children = treeMap.values().stream().filter(node -> Objects.equals(node.getParentId(), id)).collect(Collectors.toList());
        if (!children.isEmpty()) {
            children.forEach(child -> delete(child.getId()));
        }
    }

}
