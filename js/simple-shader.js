/*
  simple-shader.js v0.3.5
  written by Sudospective
  special thanks to Spax for debugging and feature requests
  
  honestly do whatever you want with this
  just dont sue me and leave my name there really
  enjoy frens
  
  https://sudospective.net
  https://git.sudospective.net/simple-shader
  https://github.com/Sudospective/simple-shader
*/

export class SimpleShader {
  static defaultVertex(ver, precision) {
    precision = precision || "low";
    if (ver === 1) {
      return `precision ${precision}p float;
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
        }`
    } else if (ver === 2) {
      return `#version 300 es
        precision ${precision}p float;
        in vec2 position;
        in vec2 texCoord;
        uniform vec2 resolution;
        out vec2 imageCoord;
        void main() {
          vec2 zeroToOne = position / resolution;
          vec2 zeroToTwo = zeroToOne * 2.0;
          vec2 clipSpace = zeroToTwo - 1.0;
          gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
          imageCoord = texCoord;
        }`
    } else return null;
  };
  static defaultFragment(ver, precision) {
    precision = precision || "low";
    if (ver === 1) {
      return `precision ${precision}p float;
        #define PI 3.1415927
        uniform vec2 resolution;
        uniform float time;
        uniform sampler2D sampler0;
        varying vec2 imageCoord;
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution;
          vec4 color = vec4(uv, (0.5 + sin(time - (PI * 0.5)) * 0.5), 1.0);
          gl_FragColor = color;
        }`
    } else if (ver === 2) {
      return `#version 300 es
        precision ${precision}p float;
        #define PI 3.1415927
        uniform vec2 resolution;
        uniform float time;
        uniform sampler2D sampler0;
        in vec2 imageCoord;
        out vec4 fragColor;
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution;
          vec4 color = vec4(uv, (0.5 + sin(time - (PI * 0.5)) * 0.5), 1.0);
          fragColor = color;
        }`
    } else return null;
  };
  static setupTexture(path, data) {
    // TODO: Fill with more supported video extensions
    const supported = {
      mp4: true
    }
    const ext = path.substring(path.lastIndexOf(".") + 1);
    if (!supported[ext]) {
      const image = new Image();
      return image;
    }
    const video = document.createElement("video");
    video.copyReady = false;
    let playing = false;
    let timeUpdate = false;
    function checkReady() {
      if (playing && timeUpdate) {
        video.copyReady = true; // haha weeeeeee
      }
    }
    video.playsInline = (data.playsInline !== null) ? data.playsInline : true;
    video.muted = (data.muted !== null) ? data.muted : true;
    video.loop = (data.loop !== null) ? data.loop : true;
    video.addEventListener("playing", () => {
      playing = true;
      checkReady();
    }, true);
    video.addEventListener("timeupdate", () => {
      timeUpdate = true;
      checkReady();
    }, true);
    video.src = path;
    return video;
  };
  canvas = null;
  ready = false;
  initTime = Date.now();
  time = 0.0;
  uniforms = {};
  constructor(canvasId, data) {
    data = data || {};
    const unis = {}; // internal
    this.canvas = document.getElementById(canvasId);
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
    this.precision = data.precision;
    this.context = this.canvas.getContext("webgl2");
    this.version = 2;
    if (!this.context) {
      this.context = this.canvas.getContext("webgl");
      this.version = 1;
    };
    if (!this.context) {
      console.log("Unable to get GL context from canvas with ID", canvasId);
      this.version = null;
      return null;
    };
    const gl = this.context;
    if (data.extensions) {
      data.extensions.forEach((ext) => {
        gl.getExtension(ext);
      });
    };
    const ver = this.version;
    async function fetchVert(path) {
      if (!path) return SimpleShader.defaultVertex(ver, data.precision);
      const text = await fetch(path)
        .then(res => res.text()).catch((e) => console.error(e));
      //console.log(text);
      return text;
    }
    async function fetchFrag(path) {
      if (!path) return SimpleShader.defaultFragment(ver, data.precision);
      const text = await fetch(path)
        .then(res => res.text()).catch((e) => console.error(e));
      //console.log(text);
      return text;
    }
    const vertProm = /\n/.test(data.vert) ? data.vert : fetchVert(data.vert);
    const fragProm = /\n/.test(data.frag) ? data.frag : fetchFrag(data.frag);
    let vertSrc = "";
    let fragSrc = "";
    Promise.all([vertProm, fragProm])
      .then((res) => {
        vertSrc = res[0];
        fragSrc = res[1];
        //console.log(vertSrc);
        //console.log(fragSrc);
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
          let texId = 0;
          Object.entries(data.sampler2D).forEach((sampler) => {
            unis[sampler[0]] = { textureIndex: texId++ };
            const image = SimpleShader.setupTexture(sampler[1], data);
            if (image.nodeName.toLowerCase() === "video") {
              this.video = image;
            }
            const assignTexture = function(obj) {
              const tex = gl.createTexture();
              obj.texture = tex;
              return (function () {
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
              });
            };
            if (!image.src) {
              image.src = sampler[1];
              image.copyReady = true;
              image.onload = assignTexture(unis[sampler[0]]);
            }
            else
              image.onloadstart = assignTexture(unis[sampler[0]]);
            unis[sampler[0]].image = image;
          });
        };
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        const uniformFunc = {
          int:   "uniform1i",
          ivec2: "uniform2iv",
          ivec3: "uniform3iv",
          ivec4: "uniform4iv",
          float: "uniform1f",
          vec2:  "uniform2fv",
          vec3:  "uniform3fv",
          vec4:  "uniform4fv",
        };
        const prog = this.program;
        const getRelMouseData = function(event, target) {
          target = target || event.target;
          let rect = target.getBoundingClientRect();
          return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          };
        };
        const getCanvasMouseData = function(event, target) {
          target = target || event.target;
          const pos = getRelMouseData(event, target);
          pos.x *= target.width / target.clientWidth;
          pos.y *= target.height / target.clientHeight;
          return pos;
        };
        const mouse = [0.0, 0.0, 0.0, 0.0];
        this.canvas.addEventListener("mousemove", event => {
          const rawPos = getCanvasMouseData(event, gl.canvas);
          const preMouse = {
            x: rawPos.x,
            y: Math.floor((1 - rawPos.y / gl.canvas.height) * gl.canvas.height)
          }
          if (event.buttons === 1) {
            mouse[0] = preMouse.x;
            mouse[1] = preMouse.y;
            mouse[3] = Math.abs(mouse[3]) * -1;
            //console.log(mouse[0], mouse[1], mouse[2], mouse[3]);
          }
        });
        this.canvas.addEventListener("mousedown", event => {
          const rawPos = getCanvasMouseData(event, gl.canvas);
          const preMouse = {
            x: rawPos.x,
            y: Math.floor((1 - rawPos.y / gl.canvas.height) * gl.canvas.height)
          }
          mouse[0] = preMouse.x;
          mouse[1] = preMouse.y;
          mouse[2] = preMouse.x;
          mouse[3] = preMouse.y;
          //console.log(mouse[0], mouse[1], mouse[2], mouse[3]);
        })
        this.canvas.addEventListener("mouseup", event => {
          mouse[2] = Math.abs(mouse[2]) * -1;
          mouse[3] = Math.abs(mouse[3]) * -1;
          //console.log(mouse[0], mouse[1], mouse[2], mouse[3]);
        });
        const render = function(timestamp) {
          if (this.ready)
            this.time = (Date.now() - this.startTime);
          else
            this.time = 0.0;
          const res = [gl.canvas.width, gl.canvas.height];
          gl.viewport(0, 0, res[0], res[1]);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.useProgram(prog);
          gl.enableVertexAttribArray(posLoc);
          gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0, 0.0,
            res[0], 0.0,
            0.0, res[1],
            0.0, res[1],
            res[0], 0.0,
            res[0], res[1],
          ]), gl.DYNAMIC_DRAW);
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
          const date = new Date();
          Object.entries(data).forEach((uniformType) => {
            const key = uniformType[0];
            if (uniformFunc[key]) {
              Object.entries(uniformType[1]).forEach((uniform) => {
                unis[uniform[0]] = uniform[1];
                const uniformLoc = gl.getUniformLocation(prog, uniform[0]);
                gl[uniformFunc[key]](uniformLoc, uniform[1]);
              });
            } else if (key === "sampler2D") {
              Object.entries(uniformType[1]).forEach((uniform) => {
                const image = unis[uniform[0]].image;
                if (!image.src) image.src = uniform[1];
                image.width = res[0];
                image.height = res[1];
                const texLoc = gl.getUniformLocation(prog, uniform[0]);
                const idx = unis[uniform[0]].textureIndex;
                gl.activeTexture(gl.TEXTURE0 + idx);
                gl.bindTexture(gl.TEXTURE_2D, unis[uniform[0]].texture);
                if (image.copyReady) {
                  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                }
                gl.uniform1i(texLoc, idx);
              });
            };
          });
          gl.uniform2fv(gl.getUniformLocation(prog, "resolution"), res);
          gl.uniform1f(gl.getUniformLocation(prog, "samplertime0"), this.video ? this.video.currentTime : 0.0);
          gl.uniform1f(gl.getUniformLocation(prog, "time"), this.time * 0.001);
          gl.uniform4fv(gl.getUniformLocation(prog, "date"), [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001
          ]);
          gl.uniform4fv(gl.getUniformLocation(prog, "mouse"), mouse);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          if (this.ready)
            window.requestAnimationFrame(this.render);
          else
            window.cancelAnimationFrame(this.render);
        };
        this.render = render.bind(this);
        this.time = 0.0;
        this.startTime = Date.now();
        this.render();
      });
  }
  play(startTime) {
    this.ready = true;
    this.startTime = startTime || Date.now();
    if (this.render) {
      if (this.video) this.video.play();
      this.render();
    }
  }
  stop() {
    this.ready = false;
    this.time = 0.0;
    this.startTime = Date.now();
    if (this.video) this.video.pause();
    this.render();
  }
  set(uniform, value) {
    this.uniforms[uniform] = value;
  }
  get(uniform) {
    return this.uniforms[uniform]
  }
};
