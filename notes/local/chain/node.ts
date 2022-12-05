type TNode<T> = T | null | undefined;

class BaseNode<T> {
  
  private _prevNode: TNode<T>;
  
  private _nextNode: TNode<T>;
  
  constructor(nextNode: TNode<T> = null, prevNode: TNode<T> = null) {
    this.setPrevNode(prevNode)
    this.setNextNode(nextNode)
  }
  
  setPrevNode(prevNode: T) {
    this.prevNode = prevNode;
  }
  
  setNextNode(nextNode: T) {
    this.nextNode = nextNode;
  }
  
  get prevNode(): any {
    return this._prevNode;
  }
  
  set prevNode(value: any) {
    this._prevNode = value;
  }
  
  get nextNode(): any {
    return this._nextNode;
  }
  
  set nextNode(value: any) {
    this._nextNode = value;
  }
}