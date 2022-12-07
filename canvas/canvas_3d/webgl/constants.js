export const VERTEX_DEFAULT_STRING = `
  attribute vec2 a_Position;
  uniform vec2 u_ScreenSize;
  void main() {
    float x = a_Position.x * 2.0 / u_ScreenSize.x - 1.0;
    float y = 1.0 - (a_Position.y * 2.0 / u_ScreenSize.y);
    float z = 0.0;
    float a = 1.0;
    gl_Position = vec4(x, y, z, a);
    gl_PointSize = 10.0;
  }`;

export const PROGRAM_DEFAULT_STRING = `
  precision mediump float;
  void main() {
    float r = 0.0;
    float g = 0.0;
    float b = 0.0;
    float a = 1.0;
    gl_FragColor = vec4(r, g, b, a);
  }`;