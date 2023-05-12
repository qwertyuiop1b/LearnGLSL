#version 300 es
precision mediump float;

out vec4 outColor;
uniform vec2 u_resolution;

// x^2 + y^2 = r^2
// offset ===>  (x - offsetX)^2 + (y - offsetY)^2 = r^2

// 默认是（0,0),小于0在圆内，大于0在圆外  
float sdfCircle(vec2 uv, float radius, vec2 offset) {
  return length(uv - offset) - radius;
}



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;  //[0,1];

  uv -= 0.5; // [-0.5, 0.5]  => 中心在正中央
  // uv.x *= u_resolution.x / u_resolution.y;

  // 以最小边为基准
  uv *= u_resolution / min(u_resolution.x, u_resolution.y);
  

  vec3 color = vec3(0);
  vec3 circleColor = vec3(0.3, 0.2, 0.8);

  float circle = sdfCircle(uv, 0.2, vec2(0));
  // step(0., circle)
  circle = smoothstep(0., 0.008, circle);
  color = mix(circleColor, color, circle);
  // color = mix(circleColor, color, step(0., circle));
  outColor = vec4(color, 1.0);
}