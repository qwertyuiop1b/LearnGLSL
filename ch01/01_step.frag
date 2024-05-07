#version 300 es
precision mediump float;


uniform float u_time;
uniform vec2 u_resolution;


out vec4 fragColor;

float fixedSize(float sizeX, vec2 uv) {
  float result = step(sizeX / u_resolution.x, uv.x);
  return result;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // float val = step(0.3, uv.x);
  // fragColor = vec4(val);

  // float val = fixedSize(50.0, uv);
  // fragColor = vec4(val);

  // vec2 val = vec2(step(0.5, uv));
  // fragColor = vec4(val, 0.0, 1.0);

  vec2 val = vec2(step(0.5, uv));
  float total = mod( val.x + val.y, 2.0);
  fragColor = vec4(total);


}