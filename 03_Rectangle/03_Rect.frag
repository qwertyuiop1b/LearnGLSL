#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;

// [0, 1]
float brand(float x, float start, float end, float blur) {
  float b1 = smoothstep(start - blur, start + blur, x);
  float b2 = smoothstep(end + blur, end - blur, x);
  return b1 * b2;
}


float rectangle(vec2 uv, float left, float right, float top, float bottom, float blur) {
  float b = brand(uv.x, left, right, blur);
  float b2 = brand(uv.y, bottom, top, blur);
  return b * b2;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.x *= u_resolution.x / u_resolution.y;
  vec3 col = vec3(0.);

  // float val = (sin(u_time * 2.) + 1.) * 0.5;
  // float val = 0.00000001;
  // float val = (sin(u_time * 2.) + 1.00001) * 0.5;
  float val = 0.005;
  float rect = rectangle(uv, 0.2, 0.4, 0.6, 0.3, val);
  col = mix(col, vec3(1.0, 0.3, 0.2), rect);

  /**变形矩形*/

  outColor = vec4(col, 1.0);
}