/**
 * @filter         Sepia
 * @description    Gives the image a reddish-brown monochrome tint that imitates an old photograph.
 * @param amount   0 to 1 (0 for no effect, 1 for full sepia coloring)
 */
function grayscale(amount) {
    gl.grayscale = gl.grayscale || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float amount;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            float intensity = dot(color.xyz, vec3(0.2126, 0.7152, 0.0722));\
            gl_FragColor = vec4(intensity, intensity, intensity, 1.0);\
        }\
    ');
    simpleShader.call(this, gl.grayscale, {});
    return this;
}
