#version 300 es
precision mediump float;


uniform float u_time;
uniform vec2 u_resolution;


out vec4 fragColor;


// max(abs(x - 2), abs(y - 2)) - 2 = 0

float sdfSquare(vec2 uv, float size, vec2 offset) {
  uv = uv - offset;
  return max(abs(uv.x), abs(uv.y)) - size;
}


// Rotation 
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;  
}

vec2 translate(vec2 uv, vec2 offset) {
  return uv - offset;
}


void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution - 0.5) * u_resolution / min(u_resolution.x, u_resolution.y);

  uv = rotate(uv, u_time);
  float s = sdfSquare(uv, 0.1, vec2(0.2));
  s = smoothstep(0.01, 0.009, s);
  fragColor = vec4(vec3(s), 1.0);
}