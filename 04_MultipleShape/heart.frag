#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;

// 心形表达式：(x^2 + y^2 - 1)^3 - x^2y^3 = 0;

float sdHeart(vec2 uv, float size, vec2 offset) {
  float x = uv.x - offset.x;
  float y = uv.y - offset.y;

  // float xx = x * x;
  // float yy = y * y;
  // float yyy = yy * y;
  // float group = xx + yy - size;
  // float d = group * group * group - xx * yyy;

  // dot
  float group = dot(x, x) + dot(y, y) - size;
  float d = group * dot(group, group) - dot(x, x) * dot(y, y) * y;

  
  // 可能会遇到异常情况
  // https://inspirnathan.com/posts/51-shadertoy-tutorial-part-5/
  // float group = pow(x, 2.) + pow(y, 2.) - size;
  // float d = pow(group, 3.) - pow(x, 2.) * pow(y, 3.);

  return d;
}


vec3 drawSence(vec2 uv) {
  vec3 col = vec3(1.);
  float heart = sdHeart(uv, 0.04, vec2(0));
  col = mix(vec3(1., 0., 0.), col, step(0., heart));
  return col;
}



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = drawSence(uv);
  

  outColor = vec4(col, 1.0);
}