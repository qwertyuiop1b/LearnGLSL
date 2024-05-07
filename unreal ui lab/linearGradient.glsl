#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

// 0 - 1 - 0 - 1
float pingpong(float time) {
  return -2.0 * abs(fract(time) - 0.5) + 1.0;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 startColor = vec3(1.0);
  vec3 endColor = vec3(0.0);

  float spd = fract(u_time * 0.3);

  fragColor = vec4(mix(startColor, endColor, uv.x + pingpong(u_time * 0.5)), 1.0);
}