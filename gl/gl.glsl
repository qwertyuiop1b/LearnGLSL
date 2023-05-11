precision mediump float;

#define PI 3.14159265359
#define TWOPI 6.28318530718

uniform vec2 u_resolution;

// gl_FragCoord   // 左下角为原点，是一个绝对坐标 [0, resolution]
// abs
// length


// void drawGrid(vec2 coord) {
//   vec3 pixel = vec3(1.0);
//   vec3 lineColor = vec3(1.0, 1.0, 0.0);

//   float start = 0.5;
//   const float sizeX = 50.0;
//   for (float i = 0; i < u_resolution.x / 50.0; i += sizeX) {
//     if (abs(coord.x - start) < 2.0) pixel = lineColor;
//   }


//   gl_FragColor = vec4(pixel, 1.0);
// }




void main() {

  // drawGrid(gl_FragCoord.xy);
  vec2 r = vec2(gl_FragCoord.xy / u_resolution.xy);
  vec3 backgroundColor = vec3(1.0);
  vec3 axesColor = vec3(0.0, 0.0, 1.0);
  vec3 gridColor = vec3(0.5);

  vec3 pixel = backgroundColor;

  const float tickWidth = 0.1;
  for (float i = 0.0; i < 1.0; i+=tickWidth) {
    if (abs(r.x - i) < 0.002) pixel = gridColor;
    if (abs(r.y - i) < 0.002) pixel = gridColor;
  }

  if (r.x < 0.01) pixel = axesColor;
  if (r.y < 0.01) pixel = axesColor;

  
  gl_FragColor = vec4(pixel, 1.0);
}