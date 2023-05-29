#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;

float Circle(vec2 uv, vec2 p, float r) {
    float d = length(p - uv) - r;
    return d;
}



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = vec3(1.0);
  float mouth = step(Circle(uv, vec2(0.), 0.15), 0.);
  mouth -=  step(Circle(uv, vec2(0., 0.075), 0.15), 0.);
  mouth = clamp(mouth, 0., 1.);
  mouth += 0.1;

  outColor = vec4(vec3(mouth), 1.0);
}