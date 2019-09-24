uniform sampler2D texture1;
varying vec2 vUv;

void main() {

  //gl_FragColor = texture2D(texture1, vUv);
  gl_FragColor = vec4(vec2(vUv),1., 1.0);
}