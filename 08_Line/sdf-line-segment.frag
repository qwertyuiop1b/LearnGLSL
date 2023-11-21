#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;


float SdfLineSeg(vec2 p, vec2 a, vec2 b) {
  vec2 ap = p - a;
  vec2 ab = b - a;
  float h = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
  return length(ap - h * ab);
}

                                                  



out vec4 outColor;


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[-0.5,0.5];

  float d = SdfLineSeg(uv, vec2(-0.2, -0.3), vec2(0.1, 0.3));
  
  d = smoothstep(0.04, 0.038, d);

  // d = clamp(d, 0.0, 0.1);
  // d = step(0.1, d);

  outColor = vec4(vec3(d), 1.0);
}