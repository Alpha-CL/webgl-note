class Chain {
  
  _nodeChain = [];
  
  constructor() {
  }
  
  pushNode(node) {
    this._nodeChain.push(node);
  }
  
  unshiftNode(node) {
  }
  
  insertNode(node, before, after = null) {
  }
  
  deleteNode(node) {
  }
  
  get nodeChain() {
    return this._nodeChain;
  }
  
  set nodeChain(value) {
    this._nodeChain = value;
  }
  
  
}