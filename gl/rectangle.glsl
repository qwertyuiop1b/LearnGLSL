precision highp float;


uniform vec2 u_resolution;

void main() {

  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  // float left = step(0.1, st.x);
  // float bottom = step(0.1, st.y);
  // color = vec3(left * bottom);

  vec2 borders = step(vec2(0.1), st);
  float pct = borders.x * borders.y;
  color = vec3(pct);


  gl_FragColor = vec4(color, 1.0);

}