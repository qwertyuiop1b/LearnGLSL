#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

/*
* halfSize(x, y)  => 
*  第二象限： p.y - halfSize.y
*  第四象限： p.x - halfSize.x
   第三象限： max(p.x - size.y, p.y - size.y);
*  第一象限： |p - size|
*
*   (p.x - size.x)^2 + (p.y - size.y)^2

max(p.x)
*/



float SdfRect(vec2 p, vec2 size) {
  vec2 q = abs(p) - size;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

float SdfRoundedRect(vec2 p, vec2 size, float r) {
  vec2 q = abs(p) - size + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}



out vec4 outColor;


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] 大边[0, >1];

  float r = SdfRoundedRect(uv, vec2(0.15, 0.05), 0.02);

  r = smoothstep(0.0, 0.001, r);

  outColor = vec4(r);
}