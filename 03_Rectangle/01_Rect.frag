precision highp float;

uniform vec2 u_resolution;

/*
// 正方形
max(abs(x - offsetX), abs(y - offsetY)) - length = 0;

*/

// fill rectangle
float rect(vec2 startPos, vec2 size, vec2 uv) {
  
  // float right = step(startPos.x, uv.x);
  // float bottom = step(startPos.y, 1.0 - uv.y);
  // vec2 rightBottom = vec2(startPos.x + size.x, startPos.y - size.y);
  // float left = step(1.0 - rightBottom.x, 1.0 - uv.x);
  // float top = step(rightBottom.y, uv.y);
 

  vec2 tl = step(startPos, vec2(uv.x, 1.0 - uv.y));
  vec2 br = step(vec2(1.0 - (startPos.x + size.x), startPos.y - size.y), vec2(1.0 - uv.x, uv.y));
  return tl.x * tl.y * br.x * br.y;
}


// border rectangle
float rectBorder(vec2 bottomLeftPos, vec2 size, float thickness, vec2 uv) {
  vec2 bl1 = step(vec2(0.2), uv);
  vec2 bl2 = step(vec2(0.2) + vec2(5.0/u_resolution.x, 5.0 / u_resolution.y), uv);
  float result = 1.0 - bl2.x * bl2.y;
  return   result * bl1.x * bl1.y;
}

float roundRectangle() {
  return 1.0;
}



/*  
// step
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);

  // float left = step(0.1, st.x);
  // float bottom = step(0.1, st.y);
  // color = vec3(left * bottom);

  //  对角
  vec2 bl = step(vec2(0.1), st);
  // vec2 tr = step(vec2(0.1), 1.0 - st);
  vec2 tr = step(vec2(0.1, 0.6), 1.0 - st);

  color = vec3(bl.x * bl.y * tr.x * tr.y);

  gl_FragColor = vec4(color, 1.0);
}
*/


/*  
// smoothstep
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);
  // float thickness  = 2. 0 / u_resolution;
  vec2 thickness = 2.0 / u_resolution.xy;

  vec2 bl = smoothstep(vec2(0.1), vec2(0.1 + thickness), st);
  vec2 tr = smoothstep(vec2(0.1), vec2(0.1 + thickness), 1.0 - st);

  color = vec3(bl.x * bl.y * tr.x * tr.y);

  gl_FragColor = vec4(color, 1.0);
}
*/



void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);

  vec2 center = vec2(0.5);





  vec2 size = vec2(0.4, 0.2);
  vec2 dist = abs(st - center) - size;
  float borderWidth = 0.05;

  float border = length(max(dist, 0.0)) - borderWidth;
  
  if (border < 0.0) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);;
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }


}
