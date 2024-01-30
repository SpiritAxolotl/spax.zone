const defSrc = {
vert: `#version 300 es
precision highp float;
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
}
`,
frag: `#version 300 es
precision highp float;
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
}
`
};

const uniFuncs = {
  int: "uniform1i",
  ivec2: "uniform2iv",
  ivec3: "uniform3iv",
  ivec4: "uniform4iv",
  float: "uniform1f",
  vec2: "uniform2fv",
  vec3: "uniform3fv",
  vec4: "uniform4fv",
}

let texCount = 0;
let samplerRes = {};
class RenderTarget {
  constructor(gl, width, height) {
    this.buffer = gl.createFramebuffer();
    this.texture = gl.createTexture();
    this.Id = texCount++;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    this.level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, this.level, internalFormat, width, height, border, format, type, data);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
  }
}
class Sampler {
  constructor(gl, uniform) {
    let src = uniform.path;
    this.data = setupSampler(uniform);
    this.Id = texCount++;
    const assignTexture = function(obj) {
      const tex = gl.createTexture();
      obj.texture = tex;
      return (function() {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      });
    };
    if (!this.data.src) {
      this.data.src = src;
      this.data.copyReady = true;
      this.data.onload = assignTexture(this);
    }
    else this.data.onloadstart = assignTexture(this);
  }
}

function loadShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function initProgram(gl, vertSrc, fragSrc) {
  const vert = loadShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = loadShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
    return null;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}
function initBuffers(gl) {
  const pos = new Float32Array([
    0.0, 0.0,
    gl.canvas.width, 0.0,
    0.0, gl.canvas.height,
    0.0, gl.canvas.height,
    gl.canvas.width, 0.0,
    gl.canvas.width, gl.canvas.height,
  ]);
  const tex = new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]);
  const posBuf = gl.createBuffer();
  const texBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
  gl.bufferData(gl.ARRAY_BUFFER, tex, gl.DYNAMIC_DRAW);
  return { posBuf, texBuf };
}
function setupSampler(uniform) {
  let src = uniform.path;
  const video = {
    mp4: true
  };
  const ext = src.substring(src.lastIndexOf(".") + 1);
  if (!video[ext]) {
    if (document.getElementById(src)) {
      const sampler = document.getElementById(src);
      sampler.copyReady = true;
      samplerRes[samplerRes.length] = [
        sampler.videoWidth,
        sampler.videoHeight
      ];
      return sampler;
    }
    const sampler = new Image();
    sampler.copyReady = true;
    return sampler;
  }
  const sampler = document.createElement("video");
  sampler.copyReady = false;
  let playing = false;
  let timeUpdate = false;
  function checkReady() {
    if (playing && timeUpdate) {
      sampler.copyReady = true;
    }
  }
  sampler.playsInline = uniform.playsInline !== null ? uniform.playsInline : true;
  sampler.muted = uniform.muted !== null ? uniform.muted : true;
  sampler.loop = uniform.loop !== null ? uniform.loop : true;
  sampler.addEventListener("playing", () => {
    playing = true;
    checkReady();
  }, true);
  sampler.addEventListener("timeupdate", () => {
    timeUpdate = true;
    checkReady();
  }, true);
  sampler.src = src;
  //sampler.play();
  return sampler;
}
async function fetchFrag(path) {
  const text = await fetch(path)
    .then(res => res.text()).catch((e) => console.error(e));
  //console.log(text);
  return text;
}
async function init(ss) {
  const gl = ss.context;
  const opts = ss.options;
  opts.uniforms = opts.uniforms || [];
  const defVert = defSrc.vert;
  const defFrag = defSrc.frag;
  ss.buffers = initBuffers(gl);
  if (!opts.frags) {
    ss.programs.push(initProgram(gl, defVert, defFrag));
    ss.targets.push(new RenderTarget(gl, ss.canvas.width, ss.canvas.height));
  }
  else {
    for (let i = 0; i < opts.frags.length; i++) {
     const fragSrc = await fetchFrag(opts.frags[i]);
     const program = initProgram(gl, defVert, fragSrc);
     const target = new RenderTarget(gl, ss.canvas.width, ss.canvas.height);
     ss.programs.push(program);
     ss.targets.push(target);
   }
  }
  ss.programs.forEach(program => {
    gl.useProgram(program);
    gl.viewport(0.0, 0.0, ss.canvas.width, ss.canvas.height);
    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(resolutionLoc, ss.canvas.width, ss.canvas.height);
  });
  for (let i = 0; i < opts.frags.length; i++) {
    opts.uniforms[i] = opts.uniforms[i] || {};
    ss.samplers[i] = ss.samplers[i] || {};
    const unis = opts.uniforms[i] || {};
    if (unis.sampler2D) {
      Object.entries(unis.sampler2D).forEach(uniform => {
        // uniform[0] = key (ex. "sampler0")
        // uniform[1] = value (ex. { path: "path/to/vid.mp4" })
        ss.samplers[i][uniform[0]] = new Sampler(gl, uniform[1]);
      });
    }
  }
}
function applyUniforms(gl, program, uniforms, samplers) {
  gl.useProgram(program);
  Object.entries(uniforms).forEach(uniformType => {
    if (uniFuncs[uniformType[0]]) {
      Object.entries(uniformType[1]).forEach(uniform => {
        const uniformLoc = gl.getUniformLocation(program, uniform[0]);
        gl[uniFuncs[uniformType[0]]](uniformLoc, uniform[1]);
      });
    }
    else if (uniformType[0] === "sampler2D") {
      Object.entries(uniformType[1]).forEach((uniform) => {
        if (samplers) {
          const sampler = samplers[uniform[0]];
          const image = sampler.data;
          if (image.play && image.paused) image.play();
          if (!image.src) image.src = uniform[1].path;
          image.width  = gl.canvas.width;
          image.height = gl.canvas.height;
          const texLoc = gl.getUniformLocation(program, uniform[0]);
          const idx = sampler.Id;
          gl.activeTexture(gl.TEXTURE0 + sampler.Id);
          gl.bindTexture(gl.TEXTURE_2D, sampler.texture);
          if (image.copyReady) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          }
          gl.uniform1i(texLoc, idx);
        }
      });
    }
  });
}

export class SimpleShader {
  programs = [];
  targets = [];
  samplers = [];
  constructor(canvasId, options) {
    this.options = options || {};
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error("Unable to get canvas with ID", canvasId);
      return null;
    }
    this.context = this.canvas.getContext("webgl2", { antialias: false });
    if (!this.context) {
      console.error("Unable to get GL context from canvas with ID", canvasId);
      return null;
    }
    init(this);
    let frame = 0;
    let time = 0.0;
    let lastTime = 0.0;
    const gl = this.context;
    const canvas = this.canvas;
    const date = new Date();
    const render = () => {
      time = performance.now() * 0.001;
      for (let i = 0; i < this.programs.length; i++) {
        const pos = new Float32Array([
          0.0, 0.0,
          gl.canvas.width, 0.0,
          0.0, gl.canvas.height,
          0.0, gl.canvas.height,
          gl.canvas.width, 0.0,
          gl.canvas.width, gl.canvas.height,
        ]);
        const tex = new Float32Array([
          0.0, 0.0,
          1.0, 0.0,
          0.0, 1.0,
          0.0, 1.0,
          1.0, 0.0,
          1.0, 1.0,
        ]);
        const buffers = this.buffers;
        const program = this.programs[i];
        const target = this.targets[i];
        const lastTarget = this.targets[i - 1];
        const uniforms = this.options.uniforms[i] || {};
        const posLoc = gl.getAttribLocation(program, "position");
        const texLoc = gl.getAttribLocation(program, "texCoord");
        const resolutionLoc = gl.getUniformLocation(program, "resolution");
        //TODO: resolution and time letiables for each sampler
        const timeLoc = gl.getUniformLocation(program, "time");
        const dateLoc = gl.getUniformLocation(program, "date");
        const deltaLoc = gl.getUniformLocation(program, "delta");
        const frameLoc = gl.getUniformLocation(program, "frame");
        const framebufferLoc = gl.getUniformLocation(program, "framebuffer");
        gl.useProgram(program);
        applyUniforms(gl, program, uniforms, this.samplers[i]);
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, time);
        gl.uniform4fv(dateLoc, [
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001
        ]);
        gl.uniform1i(frameLoc, frame++);
        gl.uniform1f(deltaLoc, time - lastTime);
        if (lastTarget)
          gl.uniform1i(framebufferLoc, lastTarget.Id);
        gl.enableVertexAttribArray(posLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texBuf);
        gl.bufferData(gl.ARRAY_BUFFER, tex, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, target.buffer);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.activeTexture(gl.TEXTURE0 + target.Id);
        gl.bindTexture(gl.TEXTURE_2D, target.texture);
        gl.texImage2D(gl.TEXTURE_2D, target.level, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
      }
      lastTime = time;
      if (this.ready)
        requestAnimationFrame(render);
      else
        cancelAnimationFrame(render);
    }
    this.render = render.bind(this);
    lastTime = performance.now() * 0.001;
    this.render();
  }
  play(startTime) {
    this.ready = true;
    this.startTime = startTime || Date.now();
    this.render();
  }
}
