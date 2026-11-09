var e=e=>{let t=document.createElement(`span`);t.style.color=e,document.body.append(t);let[n,r,i]=getComputedStyle(t).color.match(/\d+(\.\d+)?/g).map(Number);return t.remove(),[n/255,r/255,i/255]};function t(e){let t=!1,r=()=>{t=!0};return n(e).then(e=>{t?e():r=e}),()=>{t=!0,r()}}async function n(t){let n=document.createElement(`canvas`);n.className=`hero-gl`,n.setAttribute(`aria-hidden`,`true`);let r=n.getContext(`webgl2`,{premultipliedAlpha:!0,antialias:!1,alpha:!0});if(!r)return()=>{};t.prepend(n);let i=(e,t)=>{let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n},a=r.createProgram();r.attachShader(a,i(r.VERTEX_SHADER,`#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`)),r.attachShader(a,i(r.FRAGMENT_SHADER,`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPull;
uniform vec3 uInk;
uniform vec3 uAccent;
out vec4 outColor;

// Mobile-safe hash without sine - avoids trig precision breakdown on mobile GPUs (ARM Mali / Qualcomm Adreno)
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

float contour(float k, float width) {
  float f = abs(fract(k + 0.5) - 0.5);
  float fw = max(fwidth(k) * width, 0.001);
  return 1.0 - smoothstep(0.0, fw, f);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  
  float bump = 0.0;
  if (uPull > 0.001) {
    vec2 m = uMouse / uRes.y;
    float d = distance(uv, m);
    bump = exp(-min(d * d * 5.0, 25.0)) * uPull;
  }

  float h = fbm(uv * 1.35 + vec2(uTime * 0.018, uTime * 0.011)) + bump * 0.55;
  float k = h * 18.0;
  float minor = contour(k, 1.2);
  float major = contour(k / 5.0, 2.0);
  float band = step(0.5, fract(k / 2.0));

  float isPortrait = step(uRes.x, uRes.y);
  float xFade = mix(
    smoothstep(0.25, 0.85, gl_FragCoord.x / uRes.x) * 0.85 + 0.15,
    smoothstep(0.05, 0.75, gl_FragCoord.x / uRes.x) * 0.70 + 0.30,
    isPortrait
  );
  float vignette = xFade * smoothstep(0.0, 0.25, gl_FragCoord.y / uRes.y);
  float a = (minor * 0.34 + major * 0.62 + bump * minor * 0.5 + band * bump * 0.10) * vignette;
  vec3 col = mix(uInk, uAccent, clamp(bump * 1.8, 0.0, 1.0));
  outColor = vec4(col * a, a);
}`)),r.linkProgram(a);let o=r.getExtension(`KHR_parallel_shader_compile`);if(o)for(;!r.getProgramParameter(a,o.COMPLETION_STATUS_KHR);)await new Promise(e=>setTimeout(e,32));if(!r.getProgramParameter(a,r.LINK_STATUS))return n.remove(),()=>{};r.useProgram(a);let s=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,s),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let c=r.getAttribLocation(a,`p`);r.enableVertexAttribArray(c),r.vertexAttribPointer(c,2,r.FLOAT,!1,0,0);let l=e=>r.getUniformLocation(a,e),u=l(`uRes`),d=l(`uTime`),f=l(`uMouse`),p=l(`uPull`),m=l(`uInk`),h=l(`uAccent`),g=()=>{let t=getComputedStyle(document.documentElement);r.uniform3fv(m,e(t.getPropertyValue(`--ink`).trim())),r.uniform3fv(h,e(t.getPropertyValue(`--accent`).trim()))};g();let _=new MutationObserver(()=>{g(),j()});_.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`,`data-accent`]});let v=Math.min(window.devicePixelRatio||1,1.5),y=()=>{let{width:e,height:i}=t.getBoundingClientRect();n.width=Math.round(e*v),n.height=Math.round(i*v),r.viewport(0,0,n.width,n.height),r.uniform2f(u,n.width,n.height)};y();let b=new ResizeObserver(()=>{y(),j()});b.observe(t);let x={x:-1e4,y:-1e4,tx:-1e4,ty:-1e4,pull:0,target:0},S=e=>{let pt=e.touches&&e.touches[0]?e.touches[0]:e,t=n.getBoundingClientRect();x.tx=(pt.clientX-t.left)*v,x.ty=(t.bottom-pt.clientY)*v,x.x<-1e3&&(x.x=x.tx,x.y=x.ty),x.target=1,O=Math.max(O,performance.now()+2500),j()},C=()=>{x.target=0,j()};t.addEventListener(`pointermove`,S,{passive:!0}),t.addEventListener(`pointerdown`,S,{passive:!0}),t.addEventListener(`pointerup`,C,{passive:!0}),t.addEventListener(`pointercancel`,C,{passive:!0}),t.addEventListener(`touchstart`,S,{passive:!0}),t.addEventListener(`touchmove`,S,{passive:!0}),t.addEventListener(`touchend`,C,{passive:!0}),t.addEventListener(`pointerleave`,C);let w=!0,T=new IntersectionObserver(([e])=>{w=e.isIntersecting,w&&j()});T.observe(t);let E=0,D=performance.now(),O=D+4e3,k=0,A=e=>{if(E=0,!w||document.hidden)return;let t=Math.min(e-D,50)/1e3;D=e;let n=Math.min(1,Math.max(0,(O+1e3-e)/1e3))**2;let flow=0.4+0.6*n;k+=t*flow;if(k>1e4)k-=1e4;x.x+=(x.tx-x.x)*.08,x.y+=(x.ty-x.y)*.08,x.pull+=(x.target-x.pull)*.04,r.uniform1f(d,k),r.uniform2f(f,x.x,x.y),r.uniform1f(p,x.pull),r.drawArrays(r.TRIANGLES,0,3),j()},j=()=>{E||=(D=performance.now(),requestAnimationFrame(A))},M=()=>j();return document.addEventListener(`visibilitychange`,M),j(),requestAnimationFrame(()=>{n.classList.add(`is-on`),t.classList.add(`has-terrain`)}),()=>{cancelAnimationFrame(E),T.disconnect(),b.disconnect(),_.disconnect(),document.removeEventListener(`visibilitychange`,M),t.removeEventListener(`pointermove`,S),t.removeEventListener(`pointerdown`,S),t.removeEventListener(`pointerup`,C),t.removeEventListener(`pointercancel`,C),t.removeEventListener(`touchstart`,S),t.removeEventListener(`touchmove`,S),t.removeEventListener(`touchend`,C),t.removeEventListener(`pointerleave`,C),r.getExtension(`WEBGL_lose_context`)?.loseContext(),n.remove(),t.classList.remove(`has-terrain`)}}export{t as initHeroGL};