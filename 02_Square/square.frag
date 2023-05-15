#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


// max(abs(x),abs(y)) = r
// x = x-coordinate on graph
// y = y-coordinate on graph
// r = radius of square
float sdfSquare(vec2 uv, float size, vec2 offset) {
 return max(abs(uv.x - offset.x), abs(uv.y - offset.y)) - size;
}

// todo 2D旋转矩阵



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = vec3(0.);
  
  float square = step(sdfSquare(uv, 0.2, vec2(0.1)), 0.);
  col = mix(col, vec3(0.3, 0.5, 0.2), square);


  outColor = vec4(col, 1.0);
}