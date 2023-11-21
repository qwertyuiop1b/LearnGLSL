precision highp float;

uniform vec2 start_point;
uniform vec2 end_point;
uniform vec4 color;
uniform float width; // new uniform for width

void main() {
      vec2 start_point = vec2(100.0, 100.0);
    vec2 end_point = vec2(200.0, 200.0);
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
    float width = 15.0;
    vec2 dir = end_point - start_point;
    vec2 diff = gl_FragCoord.xy - start_point;
    float t = dot(dir, diff) / dot(dir, dir);
    vec2 closest_point = mix(start_point, end_point, clamp(t, 0.0, 1.0));

    // calculate distance from the line
    vec2 dist_vector = gl_FragCoord.xy - closest_point;
    float dist = length(dist_vector);

    if (dist < width) { // check if the pixel is within the width of the line
        gl_FragColor = color;
    } else {
        discard;
    }
}