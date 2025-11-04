// Author: CMH
// Title: Blend Two Images with 50% Opacity
// 將兩個圖片以50%透明度疊加在一起
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0; // 圖片1 (1.jpg)
uniform sampler2D u_tex1; // 圖片2 (2.jpg)
uniform float u_blendFactor; // 混合因子 (0.0-1.0)，0.5 = 50%透明度

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = st; // [0~1]
    
    // 讀取兩個紋理
    vec4 color0 = texture2D(u_tex0, uv);
    vec4 color1 = texture2D(u_tex1, uv);
    
    // 如果沒有設置混合因子，使用默認的0.5 (50%)
    float blendFactor = u_blendFactor;
    if (blendFactor < 0.0) {
        blendFactor = 0.5; // 默認50%混合
    }
    
    // 混合兩個圖片：result = color0 * (1 - blendFactor) + color1 * blendFactor
    // 當blendFactor = 0.5時，兩者各占50%
    vec3 blendedColor = mix(color0.rgb, color1.rgb, blendFactor);
    
    // 也可以使用線性混合（效果相同）：
    // vec3 blendedColor = color0.rgb * (1.0 - blendFactor) + color1.rgb * blendFactor;
    
    gl_FragColor = vec4(blendedColor, 1.0);
}

