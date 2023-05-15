#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;




void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  // uv *= u_resolution / min(u_resolution.x, u_resolution.y); // 小边[0,1] [0, >1];
  vec2 size = vec2(8., 8.);
  vec3 col = vec3(0.);
  vec3 rightColor = vec3(0.3, 0.6, 1.0);

  uv *= size;
  // [0, 8]
  float num = 2.0;  // 改变num的值
  float x = step(1., mod(uv.x, num));
  float y = step(1., mod(uv.y, num));
  if(x == y) {
    col = vec3(1.0);
  } else {
    col = vec3(0.0);
  }
  
  
  //float num = 2.0;
  // mod范围内循环
  // mod(x, y)  ===> x - y * floor(x / y);  负数？
  //col = vec3(step(1.0, mod(uv.x, num)));  // mod ==> [0, num] ==> step()



  // 插值函数
  // col = mix(col, rightColor, smoothstep(0.5, 0.52, uv.x));
  // col = mix(col, rightColor, step(0.5, uv.x));

  // 边界函数 
  // col = vec3(smoothstep(0.5, 0.51, uv.x));
  // col = vec3(step(0.5, uv.x));

  // if (uv.x > 0.5) {
  //   col = vec3(1.);
  // }
 

  outColor = vec4(col, 1.0);
}




// 3种颜色
// void main() {
//   vec2 uv = gl_FragCoord.xy / u_resolution;
//   float num = 3.0;
//   uv *= num;
//   vec3 col = vec3(0.);

//   vec3 leftColor = vec3(0.2, 0.3, 0);
//   vec3 rightColor = vec3(0.3, 0.5, 1.0);
//   vec3 middleColor = vec3(0., 0.8, 0.7);

//   float left = 1.0 - step(1.0, uv.x);
//   float middle = step(1.0, uv.x) * (1.0 - step(2.0, uv.x));
//   float right = step(2.0, uv.x);

//   col = mix(col, leftColor, left);
//   col = mix(col, middleColor, middle);
//   col = mix(col, rightColor, right);


//   outColor = vec4(col,1.0);
// }

