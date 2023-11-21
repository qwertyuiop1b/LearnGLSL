#version 300 es

precision mediump float;

uniform vec2 u_resolution;

out vec4 outColor;





void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv = (uv - 0.5) * 2.0; // [-1, 1]

  // 矫正
  uv *= (u_resolution / min(u_resolution.x, u_resolution.y));



 
}