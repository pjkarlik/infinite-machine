###

![travis ci build](https://travis-ci.org/pjkarlik/infinite-machine.svg?branch=master)

# Infinite Machine

Raymarching transparent effects with repetition and motion.

![Raymarching](./splash.png)
![Raymarching](./splash2.png)

![version](https://img.shields.io/badge/version-0.0.1-e05d44.svg?style=flat-square) ![webpack](https://img.shields.io/badge/webpack-4.12.1-51b1c5.svg?style=flat-square) ![WebGL](https://img.shields.io/badge/webgl-GLSL-blue.svg?style=flat-square)

- WebGL2 boilterplate.
- [vertext shader] + [fragment shader] version 300 es.
- Ray Marching (Sphere Tracing) .
- Domain repetition and animation.
- Use mod(x,y) for timing / movment.

`WebGL2Base` creates the webgl2 canvas objects and links the fragment shader and vertex sahder programs to the application and video card. `machine.js` extends the base with specific uniforms for the shaders (variables passed in like time/resolution etc)

## Run the example

Requires Node v10.15.03 or greater

```bash
$ yarn install
$ yarn start
```

open http://localhost:2020
