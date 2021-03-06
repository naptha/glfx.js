/**
 * @filter         Canny
 * @description
 */

 // http://iosgpuar.blogspot.com/2011/12/canny-edge-detection-using-fragment.html
 // https://github.com/kalxas/gnorasi/blob/master/Gnorasi/modules/deprecated/glsl/canny.frag

function canny(thresh) {
    gl.canny = gl.canny || new Shader(null, '\
        uniform sampler2D texture;\
        varying vec2 texCoord;\
        uniform vec2 texSize;\
        uniform float thresh;\
        vec4 sample(vec2 offset) {\
            return texture2D(texture, texCoord + (offset / texSize));\
        }\
        void main() {\
          float alpha = 0.5/sin(3.14159/8.0);\
          vec4 mag = sample(vec2(0.0, 0.0));\
          vec2 offset = floor(0.5 + (alpha * mag.yx / mag.zz));\
          float fwd = sample(offset).z;\
          float back = sample(-offset).z;\
          if(fwd < mag.z && back < mag.z && mag.z > thresh){\
            gl_FragColor = vec4(mag.z, mag.z, mag.z, 1.0);\
          }else{\
            gl_FragColor = vec4(0, 0, 0, 1);\
          }\
        }\
    ');

    simpleShader.call(this, gl.canny, {
        thresh: thresh,
        texSize: [this.width, this.height]
    });

    return this;
}
