#version 300 es
#define PI 3.1415926
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;


out vec4 outColor;

float sdfSquare(vec2 uv, float size, vec2 offset) {
  float x = uv.x - offset.x;
  float y = uv.y - offset.y;
  return max(abs(x), abs(y)) - size;
}



vec2 rotate2D(vec2 uv, vec2 mid, float degree) {
  float rad = degree / 180. * PI;
  return vec2(
      cos(rad) * (uv.x - mid.x) + sin(rad) * (uv.y - mid.y) + mid.x,
      cos(rad) * (uv.y - mid.y) - sin(rad) * (uv.x - mid.x) + mid.y
    );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 background = vec3(1.0, 1.0, 1.0);
  vec3 squareColor = vec3(1.0,0.0,0.0);
  float square = step(sdfSquare(rotate2D(uv, vec2(0.), u_time * 20.0), 0.2, vec2(0.5)), 0.);


  outColor = vec4(mix(background, squareColor, square), 1.0);
}