/*
  simple-shader.js
  written by Sudospective
  
  honestly do whatever you want with this
  just dont sue me and leave my name there really
  enjoy frens
  
  https://sudospective.net
*/
const src = {
vert: `precision lowp float;
attribute vec2 position;
attribute vec2 texCoord;
uniform vec2 resolution;
varying vec2 imageCoord;
void main() {
  vec2 zeroToOne = position / resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
  imageCoord = texCoord;
}
`,
frag: `precision lowp float;
#define PI 3.1415827
uniform vec2 resolution;
uniform float time;
uniform sampler2D sampler0;
varying vec2 imageCoord;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec4 color = vec4(uv, (0.5 + sin(time - (PI * 0.5)) * 0.5), 1.0);
  gl_FragColor = color;
}
`,
};

const isImage = function(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export class SimpleShader {
  static defaultVertex() {
    return src.vert;
  };
  static defaultFragment() {
    return src.frag;
  };
    ready = false;
    initTime = Date.now();
    time = 0.0;
    uniforms = {};
    constructor(canvasId, data) {
      data = data || {};
      const unis = {}; // internal
      if (data && data.uniforms) {
        Object.entries(data.uniforms).forEach((entry) => {
          const type = entry[0];
          Object.entries(entry[1]).forEach((uniform) => {
            this.uniforms[type] = uniform[1];
          });
        });
      };
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.log("Unable to get canvas with ID", canvasId);
        return null;
      };
      this.context = this.canvas.getContext("webgl");
      if (!this.context) {
        console.log("Unable to get GL context from canvas with ID", canvasId);
        return null;
      };
      const gl = this.context;
      const vertSrc = data.vert || SimpleShader.defaultVertex();
      const fragSrc = data.frag || SimpleShader.defaultFragment();
      const vert = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vert, vertSrc);
      gl.compileShader(vert);
      if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vert));
        gl.deleteShader(vert);
        return null;
      }
      const frag = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(frag, fragSrc);
      gl.compileShader(frag);
      if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(frag));
        gl.deleteShader(frag);
        return null;
      }
      const program = gl.createProgram();
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        return null;
      };
      gl.validateProgram(program);
      if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        return null;
      };
      this.program = program;
      const posLoc = gl.getAttribLocation(this.program, "position");
      const texLoc = gl.getAttribLocation(this.program, "texCoord");
      const posBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        this.canvas.width, 0.0,
        0.0, this.canvas.height,
        0.0, this.canvas.height,
        this.canvas.width, 0.0,
        this.canvas.width, this.canvas.height,
      ]), gl.DYNAMIC_DRAW);
      const texBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
      ]), gl.STATIC_DRAW);
      if (data.sampler2D) {
        var texId = 0;
        Object.entries(data.sampler2D).forEach((sampler2D) => {
          unis[sampler2D[0]] = { textureIndex: texId++ };
          const image = isImage() ? new Image() : document.createElement('video');
          image.src = sampler2D[1];
          if (!isImage()) {
            image.autoplay = true;
            image.playsInline = true;
            image.loop = true;
          }
          const assignTexture = function(obj) {
            const tex = gl.createTexture();
            const data = isImage() ? image : new Uint8Array([0, 255, 0, 255]);
            obj.texture = tex;
            return (function () {
              gl.bindTexture(gl.TEXTURE_2D, tex);
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
            });
          };
          image.onload = assignTexture(unis[sampler2D[0]]);
          unis[sampler2D[0]].image = image;
        });
      };
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      const uniformFunc = {
        int: "uniform1i",
        ivec2: "uniform2iv",
        ivec3: "uniform3iv",
        ivec4: "uniform4iv",
        float: "uniform1f",
        vec2: "uniform2fv",
        vec3: "uniform3fv",
        vec4: "uniform4fv",
      };
      const prog = this.program;
      const render = function(timestamp) {
        if (this.ready)
          this.time = (Date.now() - this.startTime);
        else
          this.time = 0.0;
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(prog);
        gl.enableVertexAttribArray(posLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.vertexAttribPointer(
          posLoc,
          2,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.enableVertexAttribArray(texLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
        gl.vertexAttribPointer(
          texLoc,
          2,
          gl.FLOAT,
          false,
          0,
          0
        );
        const res = [this.canvas.width, this.canvas.height];
        const userUniforms = this.uniforms;
        Object.entries(data).forEach((uniformType) => {
          const key = uniformType[0];
          if (uniformFunc[key]) {
            Object.entries(uniformType[1]).forEach((uniform) => {
              unis[uniform[0]] = uniform[1];
              const uniformLoc = gl.getUniformLocation(prog, uniform[0]);
              gl[uniformFunc[key]](uniformLoc, uniform[1]);
            });
          } else if (key === 'sampler2D') {
            Object.entries(uniformType[1]).forEach((uniform) => {
              const image = unis[uniform[0]].image;
              if (image.readyState !== undefined && image.readyState === 0) return;
              image.src = userUniforms[uniform[0]] || image.src;
              image.width = res[0];
              image.height = res[1];
              const texLoc = gl.getUniformLocation(prog, uniform[0]);
              const idx = unis[uniform[0]].textureIndex;
              gl.activeTexture(gl.TEXTURE0 + idx);
              gl.bindTexture(gl.TEXTURE_2D, unis[uniform[0]].texture);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); 
              gl.uniform1i(texLoc, idx);
            });
          };
        });
        gl.uniform2fv(gl.getUniformLocation(prog, "resolution"), [res[0], res[1]]);
        gl.uniform1f(gl.getUniformLocation(prog, "time"), this.time * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.flush();
        if (this.ready)
          window.requestAnimationFrame(this.render);
        else
          window.cancelAnimationFrame(this.render);
      };
      this.render = render.bind(this);
      this.time = 0.0;
      this.startTime = Date.now();
      this.render();
    }
    play() {
      this.ready = true;
      this.startTime = Date.now();
      this.render();
    }
    stop() {
      this.ready = false;
      this.time = 0.0;
      this.StartTime = Date.now();
      this.render();
    }
    set(uniform, value) {
      this.uniforms[uniform] = value;
    }
    get(uniform) {
      return this.uniforms[uniform]
    }
  };
