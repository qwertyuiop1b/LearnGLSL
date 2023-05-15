#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 outColor;


const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float PRECISION = 0.001;


// diffuse reflection ==> lambert lighting

// 





float sdSphere(vec3 p, float r) {
  vec3 offset = vec3(0, 0, -2);
  return length(p - offset) - r;
}

// vec3 calcNormal(vec3 p) {
//   float e = 0.0005; // epsilon;
//   float r = 1.0;
//   return normalize(vec3(
//     sdSphere(vec3(p.x + e, p.y, p.z), r) - sdSphere(vec3(p.x - e, p.y, p.z), r),
//     sdSphere(vec3(p.x, p.y + e, p.z), r) - sdSphere(vec3(p.x, p.y - e, p.z), r),
//     sdSphere(vec3(p.x, p.y, p.z + e), r) - sdSphere(vec3(p.x, p.y, p.z - e), r)
//   ));
// }


// https://www.shadertoy.com/view/ldfSWs
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.0005; // epsilon
  float r = 1.; // radius of sphere
  return normalize(
    e.xyy * sdSphere(p + e.xyy, r) +
    e.yyx * sdSphere(p + e.yyx, r) +
    e.yxy * sdSphere(p + e.yxy, r) +
    e.xxx * sdSphere(p + e.xxx, r));
}



float rayMarch(vec3 ro, vec3 rd, float start, float end) {
  float depth = start;
  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    vec3 p = ro + depth * rd;
    float d = sdSphere(p, 1.);
    depth += d;
    if (d < PRECISION || depth > end) {
      break;
    }
  }
  return depth;
}

void main() {
  // vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // uv -= 0.5;
  // uv *= u_resolution / min(u_resolution.x, u_resolution.y);

  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 ro = vec3(0,0,5);
  vec3 rd = normalize(vec3(uv, -1));



  float d = rayMarch(ro, rd, MIN_DIST, MAX_DIST);

  


  vec3 col = vec3(0);
  if (d > MAX_DIST) {
    col = vec3(0.6);
  } else {
    vec3 p = ro + rd * d;
    vec3 normal = calcNormal(p);
    vec3 lightPosition = vec3(2, 2, 7);
    vec3 lightDirection = normalize(lightPosition - p);

    float dif = clamp(dot(normal, lightDirection), 0., 1.);
    col = vec3(dif) * vec3(1, 0.58, 0.29);
  }


  outColor = vec4(col, 1.0);

}