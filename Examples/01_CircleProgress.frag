#version 300 es
precision mediump float;

#define PI 3.14159265358

uniform float u_time;
uniform vec2 u_resolution;
out vec4 outColor;

float Circle(vec2 uv, float radius, vec2 offset) {
  return length(uv - offset) - radius;
}


float angleToRad(float angle) {
  return angle / 180. * PI;
}


float AngleArea(vec2 uv, vec2 StartEdge, float angle) {
  float r = angleToRad(angle);
  float c = acos(dot(uv, StartEdge) / (length(StartEdge) * length(uv)));
  
  return step(r,c);
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;

  // float circle = Circle(uv, 0.2, vec2(0.0));
  float angle = AngleArea(uv, vec2(0.1), 45.);

  vec3 col = vec3(1.);

  
  col *= angle;

  outColor = vec4(col, 1.0);

}