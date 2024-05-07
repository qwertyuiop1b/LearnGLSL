#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


// 3种颜色
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float num = 3.0;
  uv *= num;
  vec3 col = vec3(0.4902, 0.1255, 0.1255);

  vec3 leftColor = vec3(0.2, 0.3, 0);
  vec3 rightColor = vec3(0.3, 0.5, 1.0);
  vec3 middleColor = vec3(0., 0.8, 0.7);

  float left = 1.0 - step(1.0, uv.x);
  float middle = step(1.0, uv.x) * (1.0 - step(2.0, uv.x));
  float right = step(2.0, uv.x);

  col = mix(col, leftColor, left);
  col = mix(col, middleColor, middle);
  col = mix(col, rightColor, right);

  outColor = vec4(col,1.0);
}

