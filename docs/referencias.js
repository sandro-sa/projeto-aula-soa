'use strict';
// No disco, abre o original; em localhost, usa a rota de PDFs do servidor de prévia.
if(location.protocol==='file:')for(const a of document.querySelectorAll('a.abrir-pdf')){
 a.href=a.dataset.arquivo+'#page='+a.dataset.pagina;
}
