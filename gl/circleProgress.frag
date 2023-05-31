#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;



vec2 RotateZ(vec2 uv, float angle) {
  float r = radians(angle);
  return mat2(cos(r), sin(r), -sin(r), cos(r)) * uv;
}

float Circle(vec2 uv, float r, vec2 offset) {
  return r - length(uv - offset);
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y; 

  float r = 0.1;
  vec2 offset = vec2(0.);
  vec2 center = offset;
  // double angle ?
  float angle = 123.;
  vec2 startEdge = vec2(center.x, center.y + r);

  uv = RotateZ(uv, angle);

  float circle = step(0., Circle(uv, r, offset));
  float circle2 = step(0., Circle(uv, r + 0.1, offset));
  float res = circle2 - circle;
  float c = dot(startEdge, (uv - center)) / (length(startEdge) * length(uv - center));
  c = step(cos(radians(angle)), c);



  vec3 col = vec3(res * c);


  outColor = vec4(col, 1.0);
}