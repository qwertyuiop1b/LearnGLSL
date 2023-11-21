#version 300 es
#define pi 3.1415926576
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


float angle2Rad(float angle) {
  return angle / 180. * pi;
}


mat2 rotate(float angle) {
  float rad = angle2Rad(angle);
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));
}


// max(abs(x),abs(y)) = r
float sdfSquare(vec2 uv, float size, vec2 offset) {
  float x = uv.x - offset.x;
  float y = uv.y - offset.y;
  vec2 rotateXY = rotate(u_time * 30.) * vec2(x, y);
 return max(abs(rotateXY.x), abs(rotateXY.y)) - size;
}





void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = vec3(0.);

  float square = step(sdfSquare(uv, 0.2, vec2(0.)), 0.);
  col = mix(col, vec3(0.3, 0.5, 0.2), square);

  outColor = vec4(col, 1.0);
}