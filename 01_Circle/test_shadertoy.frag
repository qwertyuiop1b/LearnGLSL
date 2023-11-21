#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;


float sdfCircle(vec2 t, float r) {
  return length(t) - r;
}


out vec4 outColor;


void main() {

  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution) / min(u_resolution.x, u_resolution.y);
  float distCircle = sdfCircle(uv, 0.5);
  vec3 color = distCircle > 0.0 ? vec3(1.0) : vec3(0.0);
  outColor = vec4(color, 1.0);
}
