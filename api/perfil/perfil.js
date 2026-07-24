const safe_formulario = document.getElementById('safezone')
const danger_formulario = document.getElementById('dangerzone')

safe_formulario.addEventListener('submit', async function enviar_safeformulario() {
    const dados = new FormData(safe_formulario)
    const o_formulario = Object.fromEntries(dados)
    o_formulario['danger'] = false
    
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil-changes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(o_formulario)
        })
    } catch (e) {
        console.error('falha na requisição', e)
    }
})

function pegar_cookie() {
    try {
        const cookies = document.cookie.split(';')
        const refresh = cookies[1].trim().split('=')

        return {"value": refresh[1], "erro": false}
    } catch (erro) {
        return {"value": null, "erro": true}
    }
}

async function renovar_AccessToken() {
    const csrf_refresh = pegar_cookie()

    if (csrf_refresh.erro) {
        console.log('nenhum csrf cookie encontrado fazer login novamente')
        window.location.href = '/pages/login'
    }
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
                console.warn('Seu refresh token inspirou voltando para a pagina de login')
                window.location.href = '/pages/login'
                return null;
            }
        } else {
            const dados = await resposta.json()
            console.log(dados)
        }

        const access_token_novo = await resposta.json()
        return access_token_novo
    }
    catch (erro) {
        console.log(erro)
    }
}
pegar_dados_perfil()