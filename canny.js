/**
 * @filter         Canny
 * @description
 */
function canny() {
    gl.sobel = gl.sobel || new Shader(null, '\
        uniform sampler2D texture;\
        varying vec2 texCoord;\
        uniform vec2 texSize;\
        float luminance(vec3 c) { \
           return dot(c, vec3(0.2126, 0.7152, 0.0722));\
        }\
        float sample(const int x, const int y) {\
            return luminance(texture2D(texture, texCoord + vec2(x, y) / texSize).xyz);\
        }\
        void main() {\
            float hc = sample(-1,-1) *  1.0 + sample( 0,-1) *  2.0\
                     + sample( 1,-1) *  1.0 + sample(-1, 1) * -1.0\
                     + sample( 0, 1) * -2.0 + sample( 1, 1) * -1.0;\
            float vc = sample(-1,-1) *  1.0 + sample(-1, 0) *  2.0\
                      + sample(-1, 1) *  1.0 + sample( 1,-1) * -1.0\
                      + sample( 1, 0) * -2.0 + sample( 1, 1) * -1.0;\
            gl_FragColor = vec4(hc * hc, vc * vc, 0.0, 1.0);\
        }\
    ');

    simpleShader.call(this, gl.sobel, {
        texSize: [this.width, this.height]
    });

    return this;
}
