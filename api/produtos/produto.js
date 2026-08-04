const card_grid = document.getElementById('product-grid')

async function buscar_produtos() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/produtos', {
            method: 'GET'
        })
        const dados = await resposta.json()
        console.log(dados)
        return dados
    } catch (e) {
        alert('Erro ao tentar buscar pelos produtos')
        console.error(e)
    }
}

async function colocar_produtos(page) {
    let produtos = await buscar_produtos(page)

    if (!produtos) {
        alert('Erro Produtos não encontrados')
        console.error('Erro Produtos vazios')
    } else{
        for (let produto of produtos) {
            let preco = produto.preco.split('.')
            let produto_html = `<div class="card">
                    <img src="${produto.imagem}">
                    <div class="card-title">
                        <h2>${produto.nome}</h2>
                    </div>
                    <div>
                        <h3 class="card-price"><p class="card-text-mini">R$</p><span class="card-value">${preco[0]}</span><p class="card-text-mini">${preco[1]}</p></h3>
                    </div>

                    <a class="card-button" href="#">Ver</a>
                </div>`;
                card_grid.insertAdjacentHTML('beforeend', produto_html)
        }
        produtos = []
    }
}

const carregar = document.getElementById('carregar')

carregar.addEventListener('click', function carregar_mais(params) {
    colocar_produtos()
})
colocar_produtos()
