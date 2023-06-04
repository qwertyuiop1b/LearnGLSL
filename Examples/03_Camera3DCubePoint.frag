#version 300 es
precision mediump float;


uniform vec2 u_resolution;
uniform float u_time;
out vec4 outColor;


float DrawPoint(vec3 ro, vec3 rd, vec3 p) {
  float d = length(cross(p - ro, rd)) / length(rd);
  d = smoothstep(0.06, 0.05, d);
  return d;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;

  // 缩小的时候ro的z轴缩小，屏幕也要移动
  // 所以创建一个camera来控制这两个变量
  vec3 ro = vec3(3.0 * sin(u_time) , 2., -3.0 * cos(u_time));            // 射线
  // vec3 rd = vec3(uv.x, uv.y, -2) - ro;   //  方向，-2 屏幕

  // 创建camera
  vec3 lookAt = vec3(0.5);
  vec3 forward = normalize(lookAt - ro);
  vec3 worldUp = vec3(0, 1, 0);   
  vec3 rightDir = cross(forward, worldUp);
  vec3 cameraUp = cross(rightDir, forward);

  float zoom = 0.8;
  vec3 center = ro + forward * zoom;
  vec3 intersect = center + uv.x * rightDir + uv.y * cameraUp;  // 射线与屏幕的交点

  vec3 rd = intersect - ro;

  
  float d = 0.;
  d += DrawPoint(ro, rd, vec3(0, 0, 0));
  d += DrawPoint(ro, rd, vec3(0, 0, 1));
  d += DrawPoint(ro, rd, vec3(0, 1, 0));
  d += DrawPoint(ro, rd, vec3(0, 1, 1));

  d += DrawPoint(ro, rd, vec3(1, 0, 0));
  d += DrawPoint(ro, rd, vec3(1, 0, 1));
  d += DrawPoint(ro, rd, vec3(1, 1, 0));
  d += DrawPoint(ro, rd, vec3(1, 1, 1));

  outColor = vec4(d);

}