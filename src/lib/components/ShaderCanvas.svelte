<script lang="ts">
  import { onMount } from 'svelte';

  // Draws one fragment shader over the whole canvas.
  // Uniforms: u_res (device px), u_time (s), u_mouse (device px, eased), u_dpr.
  let { fragment }: { fragment: string } = $props();

  let canvas: HTMLCanvasElement;
  let failed = $state(false);

  const VERTEX = `#version 300 es
  in vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

  function compile(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Could not create shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader failed to compile');
    }
    return shader;
  }

  onMount(() => {
    const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      failed = true;
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) ?? 'Link failed');
    gl.useProgram(program);

    // One triangle that covers the screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uDpr = gl.getUniformLocation(program, 'u_dpr');

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      target.x = mouse.x = canvas.width * 0.28;
      target.y = mouse.y = canvas.height * 0.55;
    }

    function onPointer(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      target.x = (event.clientX - rect.left) * dpr;
      target.y = (rect.bottom - event.clientY) * dpr;
    }

    let frame = 0;
    let running = false;
    const start = performance.now();
    function draw(now: number) {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.uniform1f(uTime, still ? 12 : (now - start) / 1000);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.uniform1f(uDpr, canvas.width / canvas.clientWidth);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (running && !still) frame = requestAnimationFrame(draw);
    }

    // Only animate while the canvas is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (running) frame = requestAnimationFrame(draw);
    });
    visibility.observe(canvas);

    const observer = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    observer.observe(canvas);
    resize();
    window.addEventListener('pointermove', onPointer);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('pointermove', onPointer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  });
</script>

<canvas bind:this={canvas} class:failed aria-hidden="true"></canvas>

<style>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .failed {
    display: none;
  }
</style>
