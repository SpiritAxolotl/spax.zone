export const
scatter = `
precision lowp float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D sampler0;

//rgb2hsv and hsv2rgb written by XeroOl
//All components are in the range [0...1], including hue.
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float random3d(vec3 seed) {
  return fract(sin(dot(seed, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
}

float random2d(vec2 seed) {
  return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
}

float random1d(float seed) {
  return fract(sin(seed) * 43758.5453);
}

void main() {
  //speed is like this cuz I was syncing it to Virtual Insanity
  float speed = 46.0/60.0;
  float offset = -3.65;
  float seed = max(0.0, floor(time*speed+offset));
  vec2 st = gl_FragCoord.xy/resolution.xy;
  
  vec4 image = texture2D(sampler0, st);
  vec3 colorrgb = image.xyz;
  vec3 colorhsv = rgb2hsv(image.xyz);
  
  /*vec3 randColor = vec3(
    colorhsv.x*((random3d(colorhsv+seed)*0.75)+0.5),
    colorhsv.y*((random3d(colorhsv+seed)*0.75)+0.5),
    colorhsv.z*((random3d(colorhsv+seed)*0.75)+0.5)
  );*/
  /*vec3 randColor = vec3(
    colorhsv.x,
    random1d(seed + colorhsv.y),
    abs(random2d(fract(time*st)) + colorhsv.z)
  );*/
  vec3 randColor = vec3(
    random3d((seed + 0.01) * (colorrgb+0.5)), //colorrgb.x,
    random3d((seed + 0.33) * (colorrgb+0.5)), //colorrgb.y,
    random3d((seed + 0.67) * (colorrgb+0.5))  //colorrgb.z
  );
  
  //gl_FragColor = vec4(image.xyz,1.0);
  gl_FragColor = vec4(randColor,1.0);
  //gl_FragColor = vec4(hsv2rgb(randColor),1.0);
}
`,
glitch = `
// Author: byt3_m3chanic (ported by Spax)
// Title: Day 490
// https://www.shadertoy.com/view/NdlXzs

precision mediump float;

#extension GL_OES_standard_derivatives : enable

uniform vec2 resolution;
uniform float time;


#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define pmod(p,a) mod(p,a) - 0.5*a

vec3 pal(float m){
    vec3 c = 0.5 + 0.5*sin(vec3(
        m + 0.5,
        m + 0.3,
        m - 0.5
    ));
    
    c = pow(c,vec3(14.));
    
    return c;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5*resolution.xy)/resolution.y;

    vec3 col = vec3(1);
    
    
    {
        vec2 p = uv;
        
        float md = 0.02;
        float m =p.x*6. + time + sin(p.x + cos(time) + time);
        
        if(uv.y < 0.)
            m += time;
        p.x += sin(m)*0.1;
        float id = floor(p.x/md);
        p.y = abs(p.y);
        p.x = pmod(p.x,md);
        
        float d = abs(p.x) - md*(0.1 + sin(id + m)*0.05)*2.;
        d = max(d,abs(p.y - 0.45) -0.05);
        
        //col = mix(col,1.-col,smoothstep(fwidth(d),0.,d));
        
        md = 0.001;
        float oid = floor(uv.y/md);
        
        float om =uv.x*6. + time + cos(oid) + sin(uv.x + cos(time + oid*5.) + time + oid);
        
        col = mix(col,pal(id),smoothstep(fwidth(d) + abs(sin(om))*0.005,0.,d));
        
        d = abs(p.y - 0.4) - 0.015;
        col = mix(col,1.-col,smoothstep(fwidth(d) + 0.01*(0.5+0.5*sin(time +m)),0.,d));
        
        
    }
    {
         vec2 p = uv;
        
        float md = 0.01;
        float id = floor(p.y/md);
        
        float m =p.x*6. + time + cos(id) + sin(p.x + cos(time + id*5.) + time + id);
        
        if(uv.y < 0.)


            m += time;
        p.x += sin(m)*0.1 + m + cos(id + time);
        p.y = pmod(p.y,md);
        p.x = pmod(p.x,0.4);
        
        
        float d = abs(p.y) - md*0.2;
        d = max(d,abs(p.x) - 0.1);
        d = max(d,abs(uv.y - 0.3 + sin(m*20000.)*sin( + id*md + time*1. + cos(id*md + time))*0.15) -0.25);
        
        col = mix(col,1.-col,smoothstep(fwidth(d) + 0.04*(0.5+0.5*sin(time + cos(20.*m))),0.,d));
        
    }
    
    {
        // haha pp
        vec2 pp = uv;
        
        float md = 0.0142;
        float id = floor(pp.y/md);
        
        float m =pp.x*6. + time + cos(id) + sin(pp.x + cos(time*10.*sin(time) + id*5.) + time + id);
        
    
        vec3 rd = normalize(vec3(uv + sin(m)*0.14,1));
        vec3 ro = vec3(0,0,-2);
        vec3 p = ro;
        
        float t = 0.; bool hit = false;
        
        for(int i = 0; i < 10; i++){
            vec3 q = p;
            q -= 0.2;
            q.xy *= rot(-sin(m+time)*.01*sin(time) + 0.4*time);
            float d = mix(length(q.yz),q.y,0.5+0.5*sin(time)) - 0.1 + sin(time + m*0.01)*0.1;
            
            if(d < 0.001){
                hit = true; break;
            }
            
            p = ro + rd*(t+=d);
        }
        
        if(hit){
            
            col = mix(col,1. - col*pow(pal(m*10.1  + time*5.),vec3(22,1.4,0.4)),col + sin(m));
            //col = 1.-col;
        }
        
    }
    
    float m;
    {
        vec2 pp = uv;
        
        float md = 0.01;
        float id = floor(pp.y/md);
        
        
        m = pp.x*6. + time + cos(id) + sin(pp.x + cos(time + id*5.) + time + id);
        
        if(uv.x < 0.)
            m = sin(m);
        
        
        vec2 p = abs(uv);
        
        float d = length(p.x -(+ sin(m*120.4)*0.01 + 0.9 + sin(time + id*md*0.2)*0.04*sin(time))) - 0.0;
    
        
    
        col = mix(col,0.7-col*0.4,smoothstep(fwidth(d)*(5. + sin(m)*3.),0.,d));
    }
    
     {
         
        vec2 p = uv;
        p.x += m;
        p = pmod(p,0.01);
        
        float d = abs(p.x);
    
        col = mix(col,0.2-col*1.,(1.-col)*smoothstep(fwidth(d)*(2. + sin(m*20.)*1.),0.,d));
    }
    {
        vec2 pp = uv;
        
        float md = 0.01;
        float id = floor(pp.y/md);
        
        
        m = pp.x*6. + time + cos(id) + sin(pp.x + cos(time + id*5.) + time + id);
        
        col = mix(col, 1. - col, smoothstep(0.7,0.8,sin((time+ uv.x + sin(m*120. + time*20.)*0.4)/7. )));
    
    }
    

    col = max(col,0.03*(0.5+0.5*sin(time*2.)));
    
    col = pow(col,vec3(0.4545));
    gl_FragColor = vec4(col,1.0);
}
`;
