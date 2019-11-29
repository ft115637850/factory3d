!function(a,b,c){"use strict";var d="ht",e=a[d],f=null,g=Math,h=g.abs,i=g.max,j=Number.MAX_VALUE,k=e.Default,l=k.getInternal(),m=k.clone,n=l.vec3TransformMat4,o=l.appendArray,p=function(){function a(a,b,c,d){if(a){var e=a[d];if(e){c.ignoreColor||(b.color=e.kd),!c.ignoreTransparent&&e.d>0&&e.d<1&&(b.transparent=!0,b.opacity=e.d);var f;if(!c.ignoreImage&&(f=e.map_kd)){f=f.split(" ");for(var g=-1,h=0;h<f.length;h++)"-o"===f[h]?(b.uvOffset=[parseFloat(f[h+1]),parseFloat(f[h+2])],h+=3,g=h):"-s"===f[h]&&(b.uvScale=[parseFloat(f[h+1]),parseFloat(f[h+2])],h+=3,g=h);b.image=(c.prefix||"")+f.splice(g+1).join(" ")}}}}var b=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,d=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,g=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,p=/^[og]\s*(.+)?/,s=function(a,b){return b=parseInt(b),b>=0?a[b-1]:a[b+a.length]},t=function(a,b,c,d,e){if(a.lvs){var f=s(b,d),g=s(b,e),h=c.matrix,i=a.lvs;h?(o(i,n(m(f),h)),o(i,n(m(g),h))):(o(i,f),o(i,g))}},u=function(a,b,c,d,e,f){if(a.vs){var g=s(b,d),h=s(b,e),i=s(b,f),j=c.matrix,k=a.vs;if(c.flipFace){var l=h;h=i,i=l}j?(o(k,n(m(g),j)),o(k,n(m(h),j)),o(k,n(m(i),j))):(o(k,g),o(k,h),o(k,i))}},v=function(a,b,c,d,e,f){if(a.vs){var g=s(b,d),h=s(b,e),i=s(b,f),j=c.flipY;if(c.flipFace){var k=h;h=i,i=k}a.uv.push(g[0],j?1-g[1]:g[1],h[0],j?1-h[1]:h[1],i[0],j?1-i[1]:i[1])}},w=function(a,b,c,d,e,f){if(a.vs){var g=s(b,d),h=s(b,e),i=s(b,f),j=c.normalMatrix,k=a.ns;if(c.flipFace){var l=h;h=i,i=l}j?(o(k,n(m(g),j)),o(k,n(m(h),j)),o(k,n(m(i),j))):(o(k,g),o(k,h),o(k,i))}},x=function(a,b,c,d){for(var e=d.length-1,f=0;e>f;++f)t(a,b,c,d[f],d[f+1]);t(a,b,c,d[e],d[0])},y=function(a,b,d,e,f,g,h,i){var j=e&&e.length&&i;g[3]===c?(u(a,b,f,g[0],g[1],g[2]),h&&v(a,d,f,h[0],h[1],h[2]),j&&w(a,e,f,i[0],i[1],i[2])):(u(a,b,f,g[0],g[1],g[3]),u(a,b,f,g[1],g[2],g[3]),h&&(v(a,d,f,h[0],h[1],h[3]),v(a,d,f,h[1],h[2],h[3])),j&&(w(a,e,f,i[0],i[1],i[3]),w(a,e,f,i[1],i[2],i[3])))},z=function(a,b,c,d){var e,f,g,k,l,m,n,o,p=j,q=j,r=j,s=-j,t=-j,u=-j;for(e in a)for(m=a[e].vs,o=m.length,f=0;o>f;f+=3)g=m[f+0],k=m[f+1],l=m[f+2],p>g&&(p=g),q>k&&(q=k),r>l&&(r=l),g>s&&(s=g),k>t&&(t=k),l>u&&(u=l);if(c){var v=p+(s-p)/2,w=q+(t-q)/2,x=r+(u-r)/2;for(e in a){for(m=a[e].vs,o=m.length,f=0;o>f;f+=3)m[f+0]-=v,m[f+1]-=w,m[f+2]-=x;if(n=a[e].lvs)for(o=n.length,f=0;o>f;f+=3)n[f+0]-=v,n[f+1]-=w,n[f+2]-=x}}var y,z,A;c?(y=s-p,z=t-q,A=u-r):(y=2*i(h(p),h(s)),z=2*i(h(q),h(t)),A=2*i(h(r),h(u))),0===y&&(y=Math.min(z,A)/1e3||.001),0===z&&(z=Math.min(y,A)/1e3||.001),0===A&&(A=Math.min(y,z)/1e3||.001),d.rawS3=[y,z,A];for(e in a){if(m=a[e].vs,n=a[e].lvs,b){for(o=m.length,f=0;o>f;f+=3)y&&(m[f+0]/=y),z&&(m[f+1]/=z),A&&(m[f+2]/=A);if(n)for(o=n.length,f=0;o>f;f+=3)y&&(n[f+0]/=y),z&&(n[f+1]/=z),A&&(n[f+2]/=A)}a[e].rawS3=d.rawS3}};return function(c,h,i){if(!c)return f;(l.isString(h)||h instanceof ArrayBuffer)&&(h=q(h)),i||(i={}),i.flipY==f&&(i.flipY=!0),(i.s3||i.r3||i.t3||i.mat)&&(i.matrix=l.createWorldMatrix(i.mat,i.s3,i.r3,i.rotationMode,i.t3));var j,m,n,o,s,t=e.Style["wf.loadQuadWireframe"],u=[],v=[],w=i.ignoreNormal?f:[],A=i.reverseFlipMtls,B={vs:[],uv:[],ns:w?[]:f},C={htdefault:B},D=new r(c),E={},F="";for(w&&i.matrix&&(i.normalMatrix=l.createNormalMatrix(i.matrix));null!=(m=D.stepNext());)if(m=m.trim(),0!==m.length&&"#"!==m.charAt(0))if(m.indexOf("\\")!==m.length-1)if(F&&(m=F+m,F=""),m.indexOf("#QNAN0")>=0&&(m=m.replace(/#QNAN0/gi,"0")),n=b.exec(m))u.push([parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3])]);else if(n=d.exec(m))v.push([parseFloat(n[1]),parseFloat(n[2])]);else if(w&&(n=g.exec(m)))i.flipFace?w.push([parseFloat(-n[1]),parseFloat(-n[2]),parseFloat(-n[3])]):w.push([parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3])]);else if("f"===m[0]){var G=m.split(/\s+/);if(G.length<4)continue;var H,j,I,J=[],K=[],L=[];for(j=1,I=G.length;I>j;j++)H=G[j].split("/"),J.push(parseInt(H[0],10)),H.length>1&&H[1].length>0&&L.push(parseInt(H[1],10)),H.length>2&&H[2].length>0&&K.push(parseInt(H[2],10));for(j=0,I=J.length-2;I>j;j++)y(B,u,v,w,i,[J[0],J[j+1],J[j+2]],L.length?[L[0],L[j+1],L[j+2]]:f,K.length?[K[0],K[j+1],K[j+2]]:f);t&&x(B,u,i,J)}else if(i.part&&null!==(n=p.exec(m))){B.vs&&0!==B.vs.length||(delete C[B.name],E[B.name]--);var o=(" "+n[0].substr(1).trim()).substr(1),M=E[o]||0;E[o]=M+1,s=o+(M?M:""),B=C[s]={name:s,vs:[],uv:[],ns:w?[]:f,lvs:t?[]:f}}else/^usemtl /.test(m)&&(o=m.substring(7).trim(),i.part?a(h,B,i,o):(B=C[o])||(B=C[o]={name:o,vs:[],uv:[],ns:w?[]:f,lvs:t?[]:f},i.ignoreMtls&&i.ignoreMtls.indexOf(o)>=0&&delete B.vs,(i.reverseFlip||"*"===A||A&&A.indexOf(o)>=0)&&(B.reverseFlip=!0),a(h,B,i,o)));else F+=m.substring(0,m.length-1);var N=[];for(var O in C){var P=C[O].vs;P&&0!==P.length||N.push(O)}N.forEach(function(a){delete C[a]}),z(C,i.cube,i.center,i);var Q=i.shape3d;if(Q){var R=[];for(var o in C){var B=C[o];R.rawS3=B.rawS3,R.push(B)}k.setShape3dModel(Q,R)}return C}}(),q=function(a){var b={};if(a)for(var c,d,e,f,g,h,i=new r(a),j=/\s+/;null!=(d=i.stepNext());)d=d.trim(),0!==d.length&&"#"!==d.charAt(0)&&(e=d.indexOf(" "),f=(e?d.substring(0,e):d).toLowerCase(),g=(e?d.substring(e+1):"").trim(),"newmtl"===f?b[g]=c={name:g}:c&&("ka"===f||"kd"===f||"ks"===f?(h=g.split(j,3),c[f]=[parseFloat(h[0]),parseFloat(h[1]),parseFloat(h[2]),1]):"ns"===f||"d"===f?c[f]=parseFloat(g):c[f]=g));return b},r=function(a){var b=this;if(a instanceof ArrayBuffer){b.isBuffer=!0;var c=0,d=new Uint8Array(a),e=d.length,f=d.length;b.stepNext=function(){for(var a,b,f=c;e>c;)if(a=d[c],b=a>>4,12===b||13==b)c+=2;else if(14===b)c+=3;else if(c++,10===a)return String.fromCharCode.apply(null,d.subarray(f,c));return c>f?String.fromCharCode.apply(null,d.subarray(f,c)):null}}else{b.isBuffer=!1;var g=a.split("\n"),h=0,f=g.length;b.stepNext=function(){return f>h?g[h++]:null}}};r.prototype={},r.prototype.constructor=r,l.addMethod(k,{loadObj:function(b,c,d){d=d||{};var e=!1;/(MSIE |Trident\/|Edge\/)/.test(a.navigator.userAgent)&&(e=!0);var f=function(a){var b,c=d.finishFunc,e=d.shape3d,f=a?p(a[0],a[1],d):null;if(f){if(e)b=k.getShape3dModel(e);else{b=[];for(var g in f){var h=f[g];b.rawS3=h.rawS3,b.push(h)}}c&&c(f,b,b.rawS3)}else c&&c(null)};if(e){var g=function(a){d.responseType="arraybuffer",k.xhrLoad(b,function(b){f([b,a])},d)};c?k.xhrLoad(c,function(a){g(a)},d):g()}else k.xhrLoad(c?[b,c]:[b],f,d)},parseObj:function(a,b,c){return p(a,b,c)}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);