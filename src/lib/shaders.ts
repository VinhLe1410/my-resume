// Fragment shaders for the direction lab. Each one paints the hero background.

const PRELUDE = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dpr;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

// Distance from the eased pointer, in screen heights.
float pointer(vec2 frag) {
  return distance(frag, u_mouse) / u_res.y;
}
`;

// 1. A night sky drawn with an ordered (Bayer) dither: two tones, chunky pixels, a few stars.
export const dither = `${PRELUDE}
const float BAYER[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);

void main() {
  float cell = 3.0 * u_dpr;
  vec2 px = floor(gl_FragCoord.xy / cell);
  vec2 frag = px * cell;
  vec2 uv = frag / u_res.y;

  float t = u_time;
  float clouds = fbm(uv * 2.2 + vec2(t * 0.025, t * 0.008));
  float sky = smoothstep(0.0, 1.0, frag.y / u_res.y);
  float glow = exp(-pow(pointer(frag), 2.0) * 10.0) * 0.45;
  float v = clouds * 0.85 * sky + glow;

  int index = int(mod(px.x, 4.0)) + int(mod(px.y, 4.0)) * 4;
  float threshold = (BAYER[index] + 0.5) / 16.0;
  vec3 base = vec3(0.031);
  vec3 ink = mix(vec3(0.09, 0.10, 0.16), vec3(0.22, 0.25, 0.42), smoothstep(0.4, 0.9, v));
  vec3 color = v > threshold + 0.25 ? ink : base;

  float seed = fract(sin(dot(px, vec2(12.9898, 78.233))) * 43758.5453);
  float star = step(0.998, seed) * sky;
  star *= 0.5 + 0.5 * sin(t * 2.0 + seed * 400.0);
  color = mix(color, vec3(0.85), star);
  outColor = vec4(color, 1.0);
}
`;

// 2. A field of ASCII glyphs whose density follows drifting noise and the pointer.
export const ascii = `${PRELUDE}
float glyph(int bits, vec2 p) {
  ivec2 q = ivec2(floor(p * vec2(2.5, -2.5) + 2.5));
  if (q.x < 0 || q.x > 4 || q.y < 0 || q.y > 4) return 0.0;
  return float((bits >> (q.x + 5 * q.y)) & 1);
}

void main() {
  vec2 cell = vec2(8.0, 11.0) * u_dpr;
  vec2 id = floor(gl_FragCoord.xy / cell);
  vec2 center = (id + 0.5) * cell;
  vec2 local = (gl_FragCoord.xy - center) / (cell * 0.5) * vec2(1.0, 1.4);

  float t = u_time;
  vec2 uv = center / u_res.y;
  float field = fbm(uv * 1.8 + vec2(t * 0.04, -t * 0.02));
  float ripple = 0.5 + 0.5 * sin(pointer(center) * 28.0 - t * 2.2);
  float near = exp(-pow(pointer(center), 2.0) * 6.0);
  float v = smoothstep(0.35, 0.85, field) * 0.75 + near * ripple * 0.45;

  int bits = 0;
  if (v > 0.12) bits = 4096;      // .
  if (v > 0.25) bits = 65600;     // :
  if (v > 0.38) bits = 332772;    // *
  if (v > 0.5) bits = 15255086;   // o
  if (v > 0.62) bits = 15252014;  // 8
  if (v > 0.74) bits = 13199452;  // @
  if (v > 0.86) bits = 11512810;  // #

  float lit = glyph(bits, local);
  // Dim by default so text on top stays readable; brighter only around the pointer.
  vec3 ink = mix(vec3(0.24), vec3(0.9), near);
  vec3 color = mix(vec3(0.031), ink, lit * (0.3 + v * 0.55));
  outColor = vec4(color, 1.0);
}
`;

// 3. A soft aurora: domain-warped gradient in one accent colour, with film grain.
export const aurora = `${PRELUDE}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.y;
  vec2 m = u_mouse / u_res.y;
  float t = u_time * 0.06;

  vec2 q = vec2(fbm(uv * 1.4 + t), fbm(uv * 1.4 - t + 3.7));
  float f = fbm(uv * 1.2 + q * 1.6 + vec2(t * 0.5, 0.0));

  float pull = exp(-pow(distance(uv, m), 2.0) * 2.2);
  float band = smoothstep(0.35, 0.95, f + pull * 0.35) * smoothstep(-0.2, 0.8, uv.y);

  vec3 base = vec3(0.031);
  vec3 deep = vec3(0.07, 0.08, 0.22);
  vec3 accent = vec3(0.25, 0.36, 1.0);
  vec3 haze = vec3(0.72, 0.70, 1.0);
  vec3 color = mix(base, deep, band);
  color = mix(color, accent, smoothstep(0.45, 1.0, band) * 0.7);
  color = mix(color, haze, smoothstep(0.85, 1.0, band) * 0.35);

  color += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.035;
  outColor = vec4(color, 1.0);
}
`;

// 4. Topographic contour lines over a slowly shifting height field; the pointer raises a hill.
export const contour = `${PRELUDE}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.y;
  float t = u_time * 0.03;
  float h = fbm(uv * 1.5 + vec2(t, t * 0.6));
  h += exp(-pow(pointer(gl_FragCoord.xy), 2.0) * 9.0) * 0.22;

  float steps = 16.0;
  float level = h * steps;
  float width = fwidth(level);
  float minor = 1.0 - smoothstep(0.0, width * 1.0, abs(fract(level + 0.5) - 0.5));
  float major = 1.0 - smoothstep(0.0, width * 1.6, abs(fract(level / 5.0 + 0.5) - 0.5) * 5.0);

  vec3 color = vec3(0.031);
  color = mix(color, vec3(0.26), minor * 0.8);
  color = mix(color, vec3(0.62), major);
  outColor = vec4(color, 1.0);
}
`;
