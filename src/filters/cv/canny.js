/**
 * @filter         Canny
 * @description
 */
function canny() {
    gl.canny = gl.canny || new Shader(null, '\
        uniform sampler2D texture;\
        varying vec2 texCoord;\
        uniform vec2 texSize;\
        vec4 sample(vec2 offset) {\
            return texture2D(texture, texCoord + (offset / texSize));\
        }\
        void main() {\
          float alpha = 0.5/sin(3.14159/8.0);\
          vec4 mag = sample(vec2(0.0, 0.0));\
          vec2 offset = floor(0.5 + alpha * mag.xy / mag.zz);\
          float fwd = sample(offset).z;\
          float back = sample(-offset).z;\
          if(fwd < mag.z && back < mag.z){\
            gl_FragColor = vec4(mag.z, 0, 0, 1);\
          }else{\
            gl_FragColor = vec4(0, 0, 0, 1);\
          }\
        }\
    ');

    simpleShader.call(this, gl.canny, {
        texSize: [this.width, this.height]
    });

    return this;
}

//

    //
    //
    //
    //
    //
