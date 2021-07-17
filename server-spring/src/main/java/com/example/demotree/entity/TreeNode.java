package com.example.demotree.entity;

public class TreeNode {

    private Integer id;
    private Integer parentId;
    private String name;
    private String ip;
    private Integer port;

    public TreeNode() {
        super();
    }

    public TreeNode(Integer id, Integer parentId, String name, String ip, Integer port) {
        super();
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.ip = ip;
        this.port = port;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    @Override
    public String toString() {
        return "TreeNode [id=" + id + ", parentId=" + parentId + ", name=" + name + ", ip=" + ip + ", port=" + port + "]";
    }

    public static boolean isParent(TreeNode treeNode) {
        return treeNode.getParentId() == null;
    }

}
