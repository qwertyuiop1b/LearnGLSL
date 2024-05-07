#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outColor;

vec3 sunsetGradient(float t) {
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 orange = vec3(1.0, 0.5, 0.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 color = mix(red, orange, smoothstep(0.0, 0.5, t));
  color = mix(color, yellow, smoothstep(0.5, 1.0, t));
  return color;
}


void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  
  outColor = vec4(sunsetGradient(st.x), 1.0);
}