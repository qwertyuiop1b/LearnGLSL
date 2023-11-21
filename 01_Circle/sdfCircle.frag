#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;


float sdfCircle(vec2 t, float r) {
  return length(t) - r;
}


out vec4 outColor;


void main() {
  vec3 color = vec3(0.27f, 0.39f, 0.65f);
  vec3 background = vec3(0.0392, 0.3176, 0.3647);

  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.y *= u_resolution.y / u_resolution.x;


  float circle = sdfCircle(uv - vec2(0.0), 0.2);
  circle *= 10.0;
  color = mix(color, background, smoothstep(0.0, 0.04, circle));
  // color *= exp(circle);
  // color *= 1.0 - exp(-2.0 * abs(circle));

  // add wave
  color *= sin(50.0 * circle);




 

  // circle = smoothstep(0.0, 0.005, circle);
  // color = color * circle;


  outColor = vec4(color, 1.0);
}
