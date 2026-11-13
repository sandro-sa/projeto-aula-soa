'use strict';
// Mantém a aula atual visível sem deslocar o conteúdo principal da página.
const menu=document.querySelector('aside'),atual=menu?.querySelector('a[aria-current="page"]');
if(menu&&atual)menu.scrollTop=Math.max(0,atual.offsetTop-menu.clientHeight/2);
// Destaque local conservador: todo o texto continua em nós de texto, sem HTML de entrada.
const token=/(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|<\/?[\w:.-]+|\b(?:package|import|public|private|protected|static|final|class|record|interface|enum|return|new|if|else|try|catch|throw|throws|boolean|long|int|void|extends|implements|SELECT|FROM|WHERE|CREATE|TABLE|INSERT|UPDATE|DELETE|NOT|NULL|REFERENCES)\b)/g;
for(const code of document.querySelectorAll('pre > code')) {
  const raw=code.textContent,fragment=document.createDocumentFragment();let last=0;
  for(const m of raw.matchAll(token)) {
    fragment.append(document.createTextNode(raw.slice(last,m.index)));
    const span=document.createElement('span');span.className=m[0].startsWith('"')||m[0].startsWith("'")?'syn-string':m[0].startsWith('//')||m[0].startsWith('/*')||m[0].startsWith('<!--')?'syn-comment':'syn-keyword';
    span.textContent=m[0];fragment.append(span);last=m.index+m[0].length;
  }
  fragment.append(document.createTextNode(raw.slice(last)));code.replaceChildren(fragment);
  const copy=document.createElement('button');copy.type='button';copy.className='copy';copy.textContent='Copiar código';
  copy.addEventListener('click',async()=>{
    try { if(!navigator.clipboard?.writeText) throw new Error();await navigator.clipboard.writeText(raw);copy.textContent='Copiado'; }
    catch { const range=document.createRange();range.selectNodeContents(code);getSelection().removeAllRanges();getSelection().addRange(range);copy.textContent='Código selecionado: Ctrl+C'; }
    setTimeout(()=>copy.textContent='Copiar código',2500);
  });
  code.parentElement.before(copy);
}
const key='restaurante-do-zero-mysql-v3';let feitas=[];
try {const v=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(v))feitas=v.filter(x=>typeof x==='string');}catch{}
const botao=document.querySelector('.concluir'),progresso=document.getElementById('progresso');
function atualizar(){const ok=feitas.includes(botao.dataset.aula);botao.setAttribute('aria-pressed',String(ok));botao.textContent=ok?'Aula concluída — desmarcar':'Marcar aula como concluída';progresso.textContent=`${feitas.length} de ${document.body.dataset.total} tutorias marcadas como concluídas neste navegador.`;}
botao.addEventListener('click',()=>{const id=botao.dataset.aula;feitas=feitas.includes(id)?feitas.filter(x=>x!==id):[...feitas,id];try{localStorage.setItem(key,JSON.stringify(feitas));}catch{}atualizar();});
atualizar();
