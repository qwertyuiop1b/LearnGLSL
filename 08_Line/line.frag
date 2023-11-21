precision highp float;

uniform vec2 start_point;
uniform vec2 end_point;
uniform vec4 color;

void main() {
    vec2 start_point = vec2(100.0, 100.0);
    vec2 end_point = vec2(200.0, 200.0);
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);

    vec2 dir = end_point - start_point;
    vec2 diff = gl_FragCoord.xy - start_point;
    float t = dot(dir, diff) / dot(dir, dir); // calculate the distance from the start point
    vec2 closest_point = mix(start_point, end_point, clamp(t, 0.0, 1.0)); // get the closest point on the line
    if (length(gl_FragCoord.xy - closest_point) < 14.0) { // check if the pixel is close to the line
        gl_FragColor = color; // set the color of the pixel to the line color
    } else {
        discard; // discard the pixel if it's not close to the line
    }
}