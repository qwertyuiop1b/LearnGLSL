#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


float rectangle(vec2 uv, vec2 bottomLeft, vec2 topRight ) {
  vec2 bl = step(bottomLeft, uv);
  vec2 tr = vec2(1.) - step(topRight, uv);
  return bl.x * bl.y * tr.x * tr.y;
}



vec3 getBackgroundColor(vec2 uv) {
  uv += 0.5; // remap uv to [0, 1]
  vec3 gradientStartColor = vec3(1., 0., 1.);
  vec3 gradientEndColor = vec3(0., 1., 1.);
  return mix(gradientStartColor, gradientEndColor, uv.y);
}



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1]
  
  vec3 col = vec3(0.);
  vec3 rectangleColor = vec3(0.2, 0.1, 0.8);
  col = mix(col, rectangleColor, rectangle(uv, vec2(-0.1), vec2(0.2, 0.3)));

  // vec3 col = getBackgroundColor(uv);

  // mix 插值
  // float interpolatedValue = mix(0., 1., uv.x);
  // vec3 col = vec3(interpolatedValue);

  outColor = vec4(col, 1.0);
}