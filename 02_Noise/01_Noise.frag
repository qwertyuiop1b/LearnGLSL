precision mediump float;


uniform vec2 u_resolution;
uniform float u_time;
uniform float u_mouse;



// float random(float x) {
//   return fract(sin(x) * 100000.0);
// }

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}




void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float rnd = random(st);
  gl_FragColor = vec4(vec3(rnd), 1.0);

}