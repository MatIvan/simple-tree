package com.example.demotree.repository;

import java.util.List;

import com.example.demotree.entity.TreeNode;

public interface TreeRepository {

    TreeNode getRoot();

    TreeNode getNode(Integer id);

    List<TreeNode> getAll();

    List<TreeNode> getChildren(Integer parentId);

    void insert(TreeNode treeNode);

    void update(TreeNode treeNode);

    void delete(Integer id);
}
