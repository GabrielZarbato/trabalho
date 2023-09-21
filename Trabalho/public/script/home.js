fetch('http://localhost:3000/todos').then(res => {
    res.json().then(data => {
        carregaArtigos(data);
    })
})

function carregaArtigos(data){
    const artigos = data;
    const section = document.querySelector('#artigos');
    section.innerHTML = '';
        
    artigos.forEach(item => {
        let article = document.createElement('article');
        article.classList.add('card-artigo');
        
        let a = document.createElement('a');
        a.classList.add('link-artigo');
        a.href = `/artigo/${item.kb_id}`;
        
        let h3 = document.createElement('h3');
        h3.textContent = item.kb_title;
        h3.classList.add('titulo-artigo');
        
        let p = document.createElement('p');
        p.classList.add('texto-artigo');
        p.textContent = item.kb_body;
        
        //Abastece a tag "a" com título e texto
        a.appendChild(h3);
        a.appendChild(p);
        
        //Abastece o article com titulo e texto
        article.appendChild(a);
            
        //Lança o article para dentro da section
        section.appendChild(article);
    });
}