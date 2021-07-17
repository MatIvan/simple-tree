package com.example.demotree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.example.demotree.entity.TreeNode;
import com.example.demotree.repository.TreeRepository;

@Service
public class TreeService {

    @Autowired
    @Qualifier("TreeRepositoryByMap")
    TreeRepository treeRepository;

    public List<TreeNode> getRoot() {
        return treeRepository.getRoot();
    }

    public TreeNode getNode(Integer id) {
        return treeRepository.getNode(id);
    }

    public List<TreeNode> getAll() {
        return treeRepository.getAll();
    }

    public List<TreeNode> getChildren(Integer parentId) {
        return treeRepository.getChildren(parentId);
    }

    public TreeNode save(TreeNode treeNode) {
        if (treeNode.getId() == null) {
            treeRepository.insert(treeNode);
        } else {
            treeRepository.update(treeNode);
        }
        return treeNode;
    }

    public void delete(Integer id) {
        treeRepository.delete(id);
    }
}
