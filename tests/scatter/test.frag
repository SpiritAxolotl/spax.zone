#version 300 es
precision lowp float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D sampler0;
uniform vec2 sampler0resolution;

out vec4 fragColor;

void main() {
  /*vec2 U = vec2(0.);
  vec4 O = gl_FragCoord;
  vec2 margin = vec2(10),
       Sres = resolution.xy -2.*margin,
       Tres = sampler0resolution.xy,
       ratio = Sres/Tres;
  
  U -= margin;
  
  // centering the blank part in case of rectangle fit
  U -= .5*Tres*max(vec2(ratio.x-ratio.y,ratio.y-ratio.x),0.);
  
  //U /= Tres*ratio.y;             // fit height, keep ratio
  //U /= Tres*ratio.x;             // fit width, keep ratio
  U /= Tres*min(ratio.x,ratio.y);  // fit rectangle,  keep ratio
  U *= 1.;                         // zoom out factor 
  
  fragColor = fract(U)==U 
              ? texture(sampler0, U)
              : O-O;*/

  // Calculate the aspect ratio of the input texture
  float aspectRatio = sampler0resolution.x / sampler0resolution.y;

  // Calculate the UV coordinates adjusted for aspect ratio
  vec2 adjustedUV = gl_FragCoord.xy;
  adjustedUV.x *= aspectRatio;

  // Sample the input texture using adjusted UV coordinates
  fragColor = texture(sampler0, adjustedUV);
}
