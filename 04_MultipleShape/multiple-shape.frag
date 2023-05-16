#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


float sdCircle(vec2 uv, float r, vec2 offset) {
  float x = uv.x - offset.x;
  float y = uv.y - offset.y;
  return length(vec2(x, y)) - r;
}


float sdSquare(vec2 uv, float size, vec2 offset) {
  float x = uv.x - offset.x;
  float y = uv.y - offset.y;
  return max(abs(x), abs(y)) - size;
}


float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}


float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}


float opSymx(vec2 p, float r) {
  p.x = abs(p.x);
  return sdCircle(p, r, vec2(0.2, 0.));
}

float opSymy(vec2 p, float r) {
  p.y = abs(p.y);
  return sdCircle(p, r, vec2(0., 0.2));
}

float opSymXY(vec2 p, float r) {
  p = abs(p);
  return sdCircle(p, r, vec2(0.2));
}


float opRep(vec2 p, float r, vec2 c) {
  vec2 q = mod(p + 0.5 * c, c) - 0.5 * c;
  return sdCircle(q, r, vec2(0.));
}


float opRepLim(vec2 p, float r, float c, vec2 l) {
  vec2 q = p - c * clamp(round(p / c), -1., 1.);
  return sdCircle(q, r, vec2(0.));
}


float opDisplace(vec2 p, float r) {
  float d1 = sdCircle(p, r, vec2(0.));
  float s = 0.5;
  float d2 = sin(s * p.x * 1.8);
  return d1 + d2;
}


vec3 getBackgroundColor(vec2 uv) {
  uv = uv * 0.5 + 0.5; // remap uv from <-0.5,0.5> to <0.25,0.75>
  vec3 gradientStartColor = vec3(1., 0., 1.);
  vec3 gradientEndColor = vec3(0., 1., 1.);
  return mix(gradientStartColor, gradientEndColor, uv.y); // gradient goes from bottom to top
}


vec3 drawScene(vec2 uv) {
  vec3 col = getBackgroundColor(uv);

  float res;
  // res = opSymx(uv, 0.1);
  // res = opSymy(uv, 0.1);
  // res = opSymXY(uv, 0.1);
  // res = opRep(uv, 0.05, vec2(0.2, 0.2));
  // res = opRepLim(uv, 0.05, 0.15, vec2(2., 2.));
  res = opDisplace(uv, 0.05);

  res = step(0., res);
  col = mix(vec3(1., 0., 0.), col, res);

  return col;

}




void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];

  vec3 col = drawScene(uv);


  outColor = vec4(col, 1.0);
}