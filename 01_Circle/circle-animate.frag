#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;

// x^2 + y^2 = r^2
// offset ===>  (x - offsetX)^2 + (y - offsetY)^2 = r^2




// 默认是（0,0),小于0在圆内，大于0在圆外  (sdf符号距离函数)
float sdfCircle(vec2 uv, float radius, vec2 offset) {
  return length(uv - offset) - radius;
}



void main() {

  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = vec3(0.1);
  float l = 0.2;
  float speed = 2.0;
  vec2 offset = vec2(cos(speed * u_time) * l, sin(speed * u_time) * l);
  float circle = step(sdfCircle(uv, 0.2, offset), 0.0);

  // https://inspirnathan.com/posts/48-shadertoy-tutorial-part-2/
  vec3 circleColor = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));

  col = mix(col, circleColor, circle);
  outColor = vec4(col, 1.0);
}