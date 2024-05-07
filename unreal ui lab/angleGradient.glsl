#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

float pingpong(float time) {
  return -2.0 * abs(fract(time) - 0.5) + 1.0;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  uv -= 0.5;
  const float pi = 3.1415926;
  float angle = atan(uv.y, uv.x) + pi;  // [0, 2 * pi]
  float shade = angle / (pi * 2.0);

  fragColor = vec4(vec3(shade + pingpong(u_time * 0.1)), 1.0);

}