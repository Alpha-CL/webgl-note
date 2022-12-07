export declare class WebGLProgram {
  
  public canvas: HTMLCanvasElement;
  
  public gl: WebGLRenderingContext;
  
  public vertexStr: string;
  
  public fragmentStr: string;
  
  public vertexShader: WebGLShader;
  
  public fragmentShader: WebGLShader;
  
  public program: WebGLProgram;
  
  public DefaultBackgroundColor: Array<number>;
  
  constructor();
  
  constructor(canvasId?: 'canvas' | string);
  
  constructor(canvasId?: 'canvas' | string, vertexId?: 'vertexShader' | 'fragmentShader' | string);
  
  constructor(canvasId?: 'canvas' | string, vertexId?: 'vertexShader' | string, fragmentId?: 'fragmentShader' | string);
  
  private initProgram: () => void;
  
  protected _createShader: (gl: WebGLRenderingContext, type: number, source: string) => void;
  
  protected _createProgram: (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => void;
  
  public getAttributeByKey: (key: string) => GLint;
  
  public getUniformByKey: (key: string) => WebGLUniformLocation;
  
  public webglProgram: (r: number, g: number, b: number) => void;
  
  public setFragColor: (r: number, g: number, b: number, a?: number) => void;
}