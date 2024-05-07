#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float sdfCircle(vec2 uv, float r) {
  return length(uv) -r;
}

// Moving Circle
float sdfCircleOffset(vec2 uv, float r, vec2 offset) {
  // UV Move To Origin
  return length(vec2(uv.x - offset.x, uv.y - offset.y)) - r;
}


out vec4 fragColor;


void main() {
  // vec2 uv = gl_FragCoord.xy / u_resolution;
  // uv -= 0.5;
  // uv *= u_resolution / min(u_resolution.x, u_resolution.y);

  // vec2 uv = (gl_FragCoord.xy / u_resolution - 0.5) * u_resolution / min(u_resolution.x, u_resolution.y);
  // float c = sdfCircle(uv, 0.3);
  // c = smoothstep(0.01, 0.009, c);
  // vec3 color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0.0,2.0,4.0));
  // fragColor = vec4(color * c, 1.0);


  // Moving Circle
  vec2 uv = (gl_FragCoord.xy / u_resolution - 0.5) * u_resolution / min(u_resolution.x, u_resolution.y);
  vec2 offset = vec2(sin(u_time * 2.) * 0.2, cos(u_time * 2.0) * 0.2);
  float c = sdfCircleOffset(uv, 0.1, offset);
  c = smoothstep(0.01, 0.009, c);
  vec3 color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0.0,2.0,4.0));
  fragColor = vec4(color * c, 1.0);

}