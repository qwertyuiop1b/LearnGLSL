#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;

float dot2( in vec2 v ) { return dot(v,v); }
float dot2( in vec3 v ) { return dot(v,v); }
float ndot( in vec2 a, in vec2 b ) { return a.x*b.x - a.y*b.y; }


float sdStar5(vec2 p, float r, float rf, vec2 offset) {
  p -= offset;
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-k1.x,k1.y);
  p.x = abs(p.x);
  p -= 2.0*max(dot(k1,p),0.0)*k1;
  p -= 2.0*max(dot(k2,p),0.0)*k2;
  p.x = abs(p.x);
  p.y -= r;
  vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
  float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
  return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);
}


float sdBox( in vec2 p, in vec2 b, vec2 offset) {
  p -= offset;
  vec2 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdSegment( in vec2 p, in vec2 a, in vec2 b ){
  vec2 pa = p-a, ba = b-a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa - ba*h );
}


vec3 drawSence(vec2 uv) {
  vec3 col = vec3(0.);
  float star = sdStar5(uv, 0.12, 0.45, vec2(0.2, 0));
  float box = sdBox(uv, vec2(0.2, 0.1), vec2(-0.2, 0));

  col = mix(vec3(1., 1., 0.), col, step(0., star));
  col = mix(vec3(0, 0, 1), col, step(0., box));
  return col;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];
  vec3 col = drawSence(uv);
  outColor = vec4(col, 1.0);
}