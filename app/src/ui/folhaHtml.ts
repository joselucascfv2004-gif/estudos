// Página da folha de rascunho: uma folha quadriculada com um <canvas> por cima. Desenha-se com um
// dedo (ou caneta) e rola-se a folha com dois dedos. Roda dentro de uma WebView (celular) ou de um
// <iframe> (versão web). O app manda comandos chamando `R.algumaCoisa(...)` e recebe os traços de
// volta por mensagem, para guardar o rascunho enquanto o aluno estiver na mesma questão.

export type ComandoFolha =
  | { tipo: 'ferramenta'; valor: 'caneta' | 'borracha' }
  | { tipo: 'cor'; valor: string }
  | { tipo: 'desfazer' }
  | { tipo: 'refazer' }
  | { tipo: 'limpar' };

export function comandoJs(c: ComandoFolha) {
  switch (c.tipo) {
    case 'ferramenta':
      return `R.ferramenta(${JSON.stringify(c.valor)})`;
    case 'cor':
      return `R.cor(${JSON.stringify(c.valor)})`;
    default:
      return `R.${c.tipo}()`;
  }
}

/** HTML completo da folha, já com os traços salvos (JSON) desenhados. */
export function htmlFolha(tracosJson: string) {
  const inicial = tracosJson && tracosJson.startsWith('[') ? tracosJson : '[]';
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
html,body{margin:0;height:100%;overflow:hidden;background:#FFFFFF;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
#rolagem{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
#folha{position:relative;width:100%;
 background-color:#FFFFFF;
 background-image:linear-gradient(#DCEBF7 1px,transparent 1px),linear-gradient(90deg,#DCEBF7 1px,transparent 1px);
 background-size:24px 24px}
canvas{position:absolute;left:0;top:0;touch-action:none}
</style></head><body>
<div id="rolagem"><div id="folha"><canvas id="tela"></canvas></div></div>
<script>
(function(){
  var rol=document.getElementById('rolagem'), folha=document.getElementById('folha'), tela=document.getElementById('tela');
  var ctx=tela.getContext('2d');
  var dpr=Math.min(window.devicePixelRatio||1,2);
  var tracos=${inicial}, desfeitos=[], atual=null;
  var modo='caneta', corAtual='#1F2937';
  var ponteiros={}, ultimoMeioY=null;
  function enviar(){
    var m=JSON.stringify({tipo:'tracos',dados:tracos,podeDesfazer:tracos.length>0,podeRefazer:desfeitos.length>0});
    if(window.ReactNativeWebView) window.ReactNativeWebView.postMessage(m); else if(window.parent!==window) window.parent.postMessage(m,'*');
  }
  function dimensionar(){
    var w=folha.clientWidth||window.innerWidth;
    var alturaMin=Math.max(window.innerHeight*3,1200);
    var maxY=0; tracos.forEach(function(t){for(var i=1;i<t.p.length;i+=2) if(t.p[i]>maxY) maxY=t.p[i];});
    var h=Math.max(alturaMin,maxY+window.innerHeight);
    folha.style.height=h+'px';
    tela.style.width=w+'px'; tela.style.height=h+'px';
    tela.width=Math.round(w*dpr); tela.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    redesenhar();
  }
  function estilo(t){
    ctx.globalCompositeOperation=t.e?'destination-out':'source-over';
    ctx.strokeStyle=t.e?'rgba(0,0,0,1)':t.c; ctx.lineWidth=t.w; ctx.lineCap='round'; ctx.lineJoin='round';
  }
  function desenharTraco(t){
    var p=t.p; if(p.length<2) return;
    estilo(t); ctx.beginPath(); ctx.moveTo(p[0],p[1]);
    if(p.length===2){ctx.lineTo(p[0]+0.1,p[1]+0.1);}
    for(var i=2;i<p.length-2;i+=2){var mx=(p[i]+p[i+2])/2,my=(p[i+1]+p[i+3])/2;ctx.quadraticCurveTo(p[i],p[i+1],mx,my);}
    if(p.length>2) ctx.lineTo(p[p.length-2],p[p.length-1]);
    ctx.stroke();
  }
  function redesenhar(){
    ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,tela.width,tela.height); ctx.restore();
    tracos.forEach(desenharTraco);
  }
  function ponto(e){var r=tela.getBoundingClientRect();return [Math.round((e.clientX-r.left)*10)/10,Math.round((e.clientY-r.top)*10)/10];}
  function quantos(){return Object.keys(ponteiros).length;}
  function meioY(){var s=0,n=0;for(var k in ponteiros){s+=ponteiros[k];n++;}return n?s/n:0;}
  tela.addEventListener('pointerdown',function(e){
    e.preventDefault();
    ponteiros[e.pointerId]=e.clientY;
    try{tela.setPointerCapture(e.pointerId);}catch(_){}
    if(quantos()>=2){
      if(atual){atual=null;redesenhar();}
      ultimoMeioY=meioY(); return;
    }
    var pt=ponto(e);
    atual={c:corAtual,w:modo==='borracha'?24:2.6,e:modo==='borracha',p:[pt[0],pt[1]],id:e.pointerId};
    desenharTraco(atual);
  });
  tela.addEventListener('pointermove',function(e){
    if(!(e.pointerId in ponteiros)) return;
    e.preventDefault();
    ponteiros[e.pointerId]=e.clientY;
    if(quantos()>=2){var m=meioY(); if(ultimoMeioY!==null) rol.scrollTop-=(m-ultimoMeioY); ultimoMeioY=m; return;}
    if(!atual||atual.id!==e.pointerId) return;
    var lista=e.getCoalescedEvents?e.getCoalescedEvents():[e];
    if(!lista.length) lista=[e];
    for(var i=0;i<lista.length;i++){
      var pt=ponto(lista[i]), p=atual.p, lx=p[p.length-2], ly=p[p.length-1];
      if(Math.abs(pt[0]-lx)+Math.abs(pt[1]-ly)<1.5) continue;
      estilo(atual); ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(pt[0],pt[1]); ctx.stroke();
      p.push(pt[0],pt[1]);
    }
  });
  function soltar(e){
    if(!(e.pointerId in ponteiros)) return;
    delete ponteiros[e.pointerId];
    if(quantos()<2) ultimoMeioY=null;
    if(atual&&atual.id===e.pointerId){
      delete atual.id; tracos.push(atual); atual=null; desfeitos=[];
      redesenhar(); enviar();
      var ultimoY=tracos[tracos.length-1].p; var y=ultimoY[ultimoY.length-1];
      if(y>folha.clientHeight-window.innerHeight*0.6) dimensionar();
    }
  }
  tela.addEventListener('pointerup',soltar);
  tela.addEventListener('pointercancel',soltar);
  window.R={
    ferramenta:function(v){modo=v;},
    cor:function(v){corAtual=v;modo='caneta';},
    desfazer:function(){if(tracos.length){desfeitos.push(tracos.pop());redesenhar();enviar();}},
    refazer:function(){if(desfeitos.length){tracos.push(desfeitos.pop());redesenhar();enviar();}},
    limpar:function(){if(tracos.length){desfeitos=[];tracos=[];redesenhar();enviar();}}
  };
  var larg=0;
  window.addEventListener('resize',function(){var w=folha.clientWidth; if(w&&w!==larg){larg=w;dimensionar();}});
  larg=folha.clientWidth; dimensionar(); enviar();
})();
</script></body></html>`;
}
