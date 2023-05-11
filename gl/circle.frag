precision highp float;

uniform vec2 u_resolution;


//---------------------------------------------------------
// draw rectangle at pos(-1..+1) with given size
//---------------------------------------------------------
float rectangle(vec2 pos, vec2 size)
{
  size *= 0.5;
  vec2 r = abs(uv - pos - size) - size;
  return step( max(r.x,r.y),0.0);
}




void main() {
  vec2 uv = (gl_FragCoord.xy  - 0.5 * u_resolution.xy) / u_resolution.x;

  // float r = 0.2;
  // float smoothness = 100.0 / u_resolution.x;
  // float distFromCenter = length(uv);
  // float col = fract(smoothstep(r, r + smoothness, distFromCenter));
  // gl_FragColor = vec4(col);

  float r1 = 0.2;
  float smoothness = 2.0 / u_resolution.x;
  float distFromCenter = length(uv);

  smoothstep(r1, r1 + smoothness, distFromCenter);


}