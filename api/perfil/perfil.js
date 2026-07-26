const safe_formulario = document.getElementById('safezone')
const danger_formulario = document.getElementById('dangerzone')

safe_formulario.addEventListener('submit', async function enviar_safeformulario(e) {
    e.preventDefault()
    let trava = true

    const dados = new FormData(safe_formulario)
    dados.append('danger', false)
    
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil-changes', {
            method: 'PUT',
            credentials: 'include',
            body: dados
        })

        if (resposta.status == 401 && trava) {
            console.warn('tentatando renovar seu access cookie')
            trava = false
            const resp = await renovar_AccessToken()

            if (resp) {
                console.warn('renovado com sucesso')
                return await enviar_safeformulario(e)
            } else {
                console.warn('seu token de acesso foi inspirado/deletado')
                window.location.href = '/pages/login'
            }
        } 
        if (resposta.ok) {
            const resdados = await resposta.json()
            console.log(resdados)
        }
    } catch (e) {
        console.error('falha na requisição', e)
    }
})

function pegar_cookie_por_nome(nome) {
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

async function pegar_dados_perfil() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil-dados', {
            method: 'GET',
            credentials: 'include'
        })

        if (resposta.status === 401) {
            console.warn('Tentando renovar o token...')
            const resposta_token = await renovar_AccessToken()

            if (resposta_token) {
                console.log('Token renovado com sucesso')
                return await pegar_dados_perfil()
            } else {
                console.warn('Seu refresh token inspirou/inexistente')
                window.location.href = '/pages/login'
            }
        } else {
            const dados = await resposta.json()
            console.log(dados)
            imprimir_dados_no_perfil(dados)
        }
    }
    catch (erro) {
        console.log(erro)
    }
}
pegar_dados_perfil()

const nome_completo = document.getElementById('nome_completo')
const vendedor = document.getElementById('vendedor')
const nivel = document.getElementById('nivel')
const compras = document.getElementById('compras')
const amizades = document.getElementById('amizades')

function imprimir_dados_no_perfil(objeto) {
    nome_completo.innerText = objeto.nome_completo

    if (objeto.vendedor) {
        vendedor.innerHTML = "Vendedor"
    } else {
        vendedor.innerHTML = "Comprador"
    }

    nivel.innerHTML = objeto.nivel || 0
    compras.innerHTML = objeto.nivel || 0
    amizades.innerHTML = null || 0// ainda não fiz isso
}