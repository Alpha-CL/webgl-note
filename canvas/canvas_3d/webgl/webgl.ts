export class WebGLProgram {
  
  public canvas: HTMLCanvasElement;
  public gl: WebGLRenderingContext;
  public vertexStr: string;
  public fragmentStr: string;
  
  public vertexShader: WebGLShader;
  public fragmentShader: WebGLShader;
  public program: WebGLProgram;
  
  public canvasBackgroundDefaultColor: Array<number> = [1, 1, 1, 1];
  
  constructor(
    canvasId: string = 'canvas',
    vertexId: string = 'vertexShader',
    fragmentId: string = 'fragmentShader',
  ) {
    
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.gl = (this.canvas as HTMLCanvasElement).getContext('webgl') as WebGLRenderingContext;
    
    this.vertexStr = document.getElementById(vertexId)!.innerText;
    this.fragmentStr = document.getElementById(fragmentId)!.innerText;
    
    this.vertexShader = this._createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexStr) as WebGLShader;
    this.fragmentShader = this._createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentStr) as WebGLShader;
    this.program = this._createProgram(this.gl, this.vertexShader, this.fragmentShader) as WebGLProgram;
    
    this.gl.useProgram(this.program);
  }
  
  clearCanvas = () => {
    const [r, g, b, a] = this.canvasBackgroundDefaultColor;
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };
  
  /**
   * @param gl
   * @param type
   * @param source
   */
  protected _createShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ) => {
    let shader: WebGLShader | null = gl.createShader(type);
    if (shader === null) {
      console.error('Could not create shader');
      return;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const res = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (res) return shader;
    console.log('-> getShaderInfoLog: ', gl.getShaderInfoLog(shader));
  };
  
  /**
   * @param gl
   * @param vertexShader
   * @param fragmentShader
   */
  protected _createProgram = (
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) => {
    let program: globalThis.WebGLProgram | null = gl.createProgram();
    if (program === null) {
      console.error('Could not create program');
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const res = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (res) return program;
    console.log('-> getProgramInfoLog: ', gl.getProgramInfoLog(program));
  };
}









