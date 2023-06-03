#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
out vec4 outColor;


// 叉积  求组成的四边形的高，即求p到射线的距离
float DistLine(vec3 ro, vec3 rd, vec3 p) {
  return length(cross(p - ro, rd)) / length(rd);
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;

    
  vec3 ro = vec3(0., 0., -2.);
  vec3 rd = vec3(uv.x, uv.y, 0.) - ro;
  
  vec3 p = vec3(sin(u_time), 0., 2. + cos(u_time));
  float d = DistLine(ro, rd, p);
  d = smoothstep(0.1, 0.09, d);

  outColor = vec4(d);


}