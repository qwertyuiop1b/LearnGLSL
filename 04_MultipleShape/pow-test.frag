#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = vec3(pow(-0.5, 1.));
  // col -= 0.5;
  // col *= 1.0;

  outColor = vec4(col, 1.0);
}