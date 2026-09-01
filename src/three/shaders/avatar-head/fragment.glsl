#include ../includes/avatar-progress/fragment.glsl;
#include ../includes/about-ambient.glsl;

uniform sampler2D uHeadTexture;
uniform vec2 uHeadTextureSize;
uniform vec3 uTint;
uniform float uTintAmount;
uniform float uHairY;

varying vec2 vUv;
varying float vHeadY;

void main() {
    vec4 tex = texture2D(uHeadTexture, vUv);

    float progress = getProgress();

    // Hair is the darker (brown) region of the head texture; the face is pale skin.
    float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    float hair = smoothstep(0.65, 0.45, lum);

    vec3 color = mix(tex.rgb, uTint, uTintAmount);
    color = mix(color, vec3(0.0, 0.0, 0.0), hair); // pure black #000000 hair
    color = applyAmbient(color);
    color = mix(color, vec3(0.0, 0.0, 0.0), hair); // re-apply so ambient can't lighten the hair

    gl_FragColor = vec4(color, progress);
}