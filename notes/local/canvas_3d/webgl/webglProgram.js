import { PROGRAM_DEFAULT_STRING, VERTEX_DEFAULT_STRING } from './constants.js';

export class WebGLProgram {
  
  /**
   * @param {HTMLCanvasElement} canvas html element document
   * @param {WebGLRenderingContext} gl webgl render context
   * @param {string} vertexStr vertex shader string
   * @param {string} fragmentStr fragment shader string
   * @param {vertexShader} WebGLShader vertex shader
   * @param {fragmentShader} WebGLShader fragment shader
   * @param {program} WebGLProgram webgl program
   * @param {Array<number>} canvasBackgroundDefaultColor default background color
   */
  canvas;             // canvas dom element
  
  gl;                 // canvas context of webgl
  
  vertexStr;          // vertex shader source code of string type
  
  fragmentStr;        // fragment shader source code of string type
  
  vertexShader;       // vertex shader
  
  fragmentShader;     // fragment shader
  
  program;            // webgl program
  
  DefaultBackgroundColor = [1, 1, 1, 1];    // canvas default background color
  
  /**
   * @param {string} canvasId
   * @param {string} vertexId
   * @param {string} fragmentId
   */
  constructor(
    canvasId = 'canvas',
    vertexId = 'vertexShader',
    fragmentId = 'fragmentShader',
  ) {
    
    this.canvas = document.getElementById(canvasId);
    this.gl = (this.canvas).getContext('webgl');
    
    if (!this.gl) {
      console.log('-> gl', gl);
      return;
    }
    this.vertexStr = document.getElementById(vertexId).innerText || VERTEX_DEFAULT_STRING;
    this.fragmentStr = document.getElementById(fragmentId).innerText || PROGRAM_DEFAULT_STRING;
    
    this.vertexShader = this._createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexStr);
    this.fragmentShader = this._createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentStr);
    
    if (!this.vertexShader || !this.fragmentShader) {
      console.log('-> vertexShader', vertexShader);
      console.log('-> fragmentShader', fragmentShader);
      return;
    }
    this.program = this._createProgram(this.gl, this.vertexShader, this.fragmentShader);
    
    this.initProgram();
  }
  
  initProgram = () => {
    const [r, g, b, a] = this.DefaultBackgroundColor;
    this.gl.useProgram(this.program);
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    const u_ScreenSize = this.getUniformByKey('u_ScreenSize');
    if (u_ScreenSize) {
      const { width, height } = this.canvas;
      this.gl.uniform2f(u_ScreenSize, width, height);
    }
  };
  
  /**
   * @param {WebGLRenderingContext} gl
   * @param {number} type
   * @param {string} source
   */
  _createShader = (gl, type, source) => {
    let shader = gl.createShader(type);
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
   * @param {WebGLRenderingContext} gl
   * @param {vertexShader} vertexShader
   * @param {vertexShader} fragmentShader
   */
  _createProgram = (gl, vertexShader, fragmentShader) => {
    let program = gl.createProgram();
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
  
  /**
   * @param key
   * @return {GLint}
   */
  getAttributeByKey = (key) => {
    return this.gl.getAttribLocation(this.program, key);
  };
  
  /**
   * @param key
   * @return {WebGLUniformLocation}
   */
  getUniformByKey = (key) => {
    return this.gl.getUniformLocation(this.program, key);
  };
  
  setFragColor = (r, g, b, a = 1) => {
    const u_FragColor = this.gl.getUniformLocation(this.program, 'u_FragColor');
    this.gl.uniform4f(u_FragColor, r, g, b, a);
  };
}