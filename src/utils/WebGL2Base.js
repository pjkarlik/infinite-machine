/**
 * Base WebGL2 /GLSL Shader BoilerPlate
 * pjkarlik@gmail.com
 * October 2019
 * Standard program for attaching shader code for
 * WebGL2 / WebXR / WebVR
 */

/* eslint no-console:0 */
export default class BaseRender {
  constructor() {
    // Make Canvas and get WebGl2 Context //
    const width = (this.width = ~~(document.documentElement.clientWidth,
    window.innerWidth || 0));
    const height = (this.height = ~~(document.documentElement.clientHeight,
    window.innerHeight || 0));
    const canvas = (this.canvas = document.createElement("canvas"));
    canvas.id = "GLShaders";
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    const gl = (this.gl = canvas.getContext("webgl2"));

    if (!gl) {
      console.warn("WebGL 2 is not available.");
      return;
    }
    // WebGl and WebGl2 Extension //
    this.gl.getExtension("OES_standard_derivatives");
    this.gl.getExtension("EXT_shader_texture_lod");
    this.gl.getExtension("OES_texture_float");
    this.gl.getExtension("WEBGL_color_buffer_float");
    this.gl.getExtension("OES_texture_float_linear");

    this.gl.viewport(0, 0, canvas.width, canvas.height);

    window.addEventListener(
      "resize",
      () => {
        const width = ~~(document.documentElement.clientWidth,
        window.innerWidth || 0);
        const height = ~~(document.documentElement.clientHeight,
        window.innerHeight || 0);
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.clearCanvas();
      },
      true
    );
  }

  createShader = (type, source) => {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!success) {
      console.log(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return false;
    }
    return shader;
  };

  createWebGL = (vertexSource, fragmentSource) => {
    // Setup Vertext/Fragment Shader functions
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    this.fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentSource
    );

    // Setup Program and Attach Shader functions
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.warn(
        "Unable to initialize the shader program: " +
          this.gl.getProgramInfoLog(this.program)
      );
      return null;
    }

    // Create and Bind buffer //
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]),
      this.gl.STATIC_DRAW
    );

    const vPosition = this.gl.getAttribLocation(this.program, "vPosition");

    this.gl.enableVertexAttribArray(vPosition);
    this.gl.vertexAttribPointer(
      vPosition,
      2, // size: 2 components per iteration
      this.gl.FLOAT, // type: the data is 32bit floats
      false, // normalize: don't normalize the data
      0, // stride: 0 = move forward size * sizeof(type) each iteration to get the next position
      0 // start at the beginning of the buffer
    );

    this.clearCanvas();

    this.importUniforms();
    this.localUniforms();
  };

  clearCanvas = () => {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };

  importUniforms = () => {
    const width = ~~(document.documentElement.clientWidth,
    window.innerWidth || 0);
    const height = ~~(document.documentElement.clientHeight,
    window.innerHeight || 0);
    this.resolution = new Float32Array([width, height]);
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, "resolution"),
      this.resolution
    );
  };

  updateUniforms = () => {
    this.localUpdates();
    this.gl.drawArrays(
      this.gl.TRIANGLE_FAN, // primitiveType
      0, // Offset
      4 // Count
    );
  };

  localUpdates = () => {
    // Function to add local uniform updates
  };

  localUniforms = () => {
    // Function to add local uniform programs
  };
}
