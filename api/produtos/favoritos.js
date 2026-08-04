function pegar_cookie_por_nome(nome) { // essa função foi feita por ia :(
    const valor = `; ${document.cookie}`;
    const partes = valor.split(`; ${nome}=`);
    if (partes.length === 2) return partes.pop().split(';').shift();
    return null;
}

async function renovar_AccessToken() {
    const csrf_refresh = pegar_cookie_por_nome('csrf_refresh_token')

    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrf_refresh
            }
    })

    if (resposta.ok) {
        const dados_token = await resposta.json()
        const novo_access_token = dados_token.access_token;
        
        return true
    }

    } catch (erro) {
        console.error(erro)
        return false
}}

async function buscar_favoritos() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/favoritos', {
            method: 'GET',
            credentials: 'include'
        })
        if (resposta.status ==  401) {
            const renovar_res = await renovar_AccessToken()
            if (renovar_res) {
                return await buscar_favoritos()
            } else {
                console.log('aviso')
            }
        }

        const dados = await resposta.json()
        console.log(dados)
    } catch (e) {
        console.error(e)
    }
}
buscar_favoritos()