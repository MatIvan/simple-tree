package com.example.demotree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demotree.entity.TreeNode;
import com.example.demotree.service.TreeService;

@RestController
@RequestMapping("v1/nodes")
@CrossOrigin("*")
public class TreeNodeController {

    @Autowired
    TreeService treeService;

    @PostMapping
    public TreeNode addNode(@RequestBody TreeNode treeNode) {
        return treeService.save(treeNode);
    }

    @GetMapping
    public List<TreeNode> getAllNodes() {
        return treeService.getAll();
    }

    @GetMapping("/root")
    public List<TreeNode> getRootNodes() {
        return treeService.getRoot();
    }

    @GetMapping("/{id}")
    public TreeNode getNode(@PathVariable Integer id) {
        return treeService.getNode(id);
    }

    @PutMapping("/{id}")
    public TreeNode updateNode(@PathVariable Integer id, @RequestBody TreeNode treeNode) {
        treeNode.setId(id);
        return treeService.save(treeNode);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNode(@PathVariable Integer id) {
        treeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/children")
    public List<TreeNode> getChildren(@PathVariable Integer id) {
        return treeService.getChildren(id);
    }

}
