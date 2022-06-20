var addressTree;

class Node {
    data;
    left;
    right;
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    _length = 0;
    root;
    constructor(dataSet) {
        this.root = null;
        for (var i = 1; i < dataSet.length; i++) {
            this.insert(dataSet[i]);
        }
    }

    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }


    }
    insertNode(node, newNode) {
        let _min = this.min(newNode.data, node.data);
        if (_min == newNode.data) {
            if (node.left == null) {
                node.left = newNode;
                this._length++;
                return;
            }
            this.insertNode(node.left, newNode)
        } else {
            if (node.right == null) {
                node.right = newNode;
                this._length++;
            } else this.insertNode(node.right, newNode)
        }
    }

    searchs(data) {
        while (true) {
            if (this.root == null)
                return null;
            else if (this.root.data == data)
                return this.root;
            else if (this.min(data, this.root.data) == data)
                this.root = this.root.left;
            else this.root = this.root.right;
        }
    }
    search(data) {
        return this.searchNode(this.root, data);
    }
    searchNode(node, data) {
        if (node === null) {
            return null;
        }
        if (data == node.data) return node
        let _min = this.min(node.data, data);
        if (_min == data) {
            return this.searchNode(node.left, data);
        } else {
            return this.searchNode(node.right, data);
        }
    }

    min(data1, data2) {
        return data1 < data2 ? data1 : data2
    }
    get length() {
        return this._length;
    }
    get tree() {
        return this.root;
    }
}

const allRecord = [{ address: "a" }, { address: "bb" }, { address: "ac" }, { address: "bd" }, { address: "ce" }, { address: "ef" } ]

async function getTree() {
    if (addressTree)
        return addressTree;
    else {
        // let all = await user.find({})
        let result = allRecord;
        addressTree = new BinaryTree(result.map(record => record.address));
        console.log({
            addressTree: JSON.stringify(addressTree.tree)
        });
        // return addressTree;
    }
}

getTree()
if (addressTree) {
    let search = addressTree.searchs("ced");
    console.log({
        search: JSON.stringify(search)
    });
}
