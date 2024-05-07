#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

float diagonalMask(vec2 uv) {
  return step(0.0, uv.x - uv.y);
}

float checkerMask(vec2 uv) {
  vec2 v = floor(uv * 2.0);
  float val = mod(v.x + v.y, 2.0);
  return val;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float val1 = diagonalMask(uv);
  float val2 = diagonalMask(vec2(1.0 - uv.x, uv.y));

  float right = clamp(val1 - val2, 0.0, 1.0);
  float left = clamp(val2 - val1, 0.0, 1.0);
  
  float topDiagonal = 1.0 - max(right, left);
  float rightDiagonal = 1.0 - topDiagonal;
  float result = mix(rightDiagonal, topDiagonal, checkerMask(uv));

  fragColor = vec4(vec3(result), 1.0);
}