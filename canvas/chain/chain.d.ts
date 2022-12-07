export declare class Chain {
  
  private _nodeChain: Array<BaseNode>;
  
  constructor();
  
  constructor(nodeArr: Array<BaseNode>);
  
  public pushNode(node: BaseNode): void;
  
  public unshiftNode(node: BaseNode): void;
  
  public insertNode(node: BaseNode): void;
  
  public deleteNode(nodeName: string): void;
  
  get nodeChain(): Array<BaseNode>;
  
  set nodeChain(value: Array<BaseNode>);
}