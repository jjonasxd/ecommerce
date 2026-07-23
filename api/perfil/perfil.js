const safe_formulario = document.getElementById('safezone')
const danger_formulario = document.getElementById('dangerzone')

safe_formulario.addEventListener('submit', async function enviar_safeformulario() {
    const dados = new FormData(safe_formulario)
    const o_formulario = Object.fromEntries(dados)
    o_formulario['danger'] = false
    
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil', {
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

async function renovar_AccessToken() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/refresh', {
            method: 'POST',
            credentials: 'include'
    })
    if (resposta.ok) {
        return true
    }

    return false

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
            }
        } else {
            const dados = await resposta.json()
            console.log(dados)
        }
    }
    catch (erro) {
        console.log(erro)
    }
}
pegar_dados_perfil()