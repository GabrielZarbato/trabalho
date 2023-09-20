const itens = [];

fetch('../data/articles.json').then(res => {
    res.json().then(data => {
        itens = data;
        carregaArtigos();
    });
});

function carregaArtigos(){
    
}