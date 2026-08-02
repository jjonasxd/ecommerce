const safe_formulario = document.getElementById('safezone')
const danger_formulario = document.getElementById('dangerzone')

safe_formulario.addEventListener('submit', async function enviar_safeformulario(e) {
    e.preventDefault()

    const dados = new FormData(safe_formulario)
    dados.append('danger', false)
    const csrf_access = pegar_cookie_por_nome('csrf_access_token')

    const formData = new FormData()
    formData.append('foto', dados.get('foto'))

    const Odados = Object.fromEntries(dados)
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil-avatar', {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': csrf_access
            },
            credentials: 'include',
            body: formData
        })

        if (resposta.status == 401) {
            console.warn('tentatando renovar seu access cookie')
            const resp = await renovar_AccessToken()

            if (resp) {
                console.warn('renovado com sucesso')
                return await enviar_safeformulario(e)
            } else {
                console.warn('seu token de acesso foi inspirado/deletado')
                window.location.href = '/pages/login'
            }
        }
        const resdados = await resposta.json()
        console.log(resdados)
        if (resposta.ok) {
            console.log(resdados)
        }
    } catch (e) {
        console.error('falha na requisição', e)
    }
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/perfil-changes', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrf_access,
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(Odados)
        })
        if (resposta.status == 401) {
            console.warn('tentatando renovar seu access cookie')
            const resp = await renovar_AccessToken()

            if (resp) {
                console.warn('renovado com sucesso')
                return await enviar_safeformulario(e)
            } else {
                console.warn('seu token de acesso foi inspirado/deletado')
                window.location.href = '/pages/login'
            }
        }
        const novosdados = await resposta.json()
        console.log(novosdados)
    } catch (e) {
        console.error(e)
    }
})

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
const foto_de_perfil = document.getElementById('foto-de-perfil')
const bio = document.getElementById('bio')

function imprimir_dados_no_perfil(objeto) {
    nome_completo.innerText = objeto.nome_completo

    if (objeto.vendedor) {
        vendedor.innerHTML = "Vendedor"
    } else {
        vendedor.innerHTML = "Comprador"
    }
    const a_nome = objeto.nome_completo.split(' ')
    let abreviacao

    if (a_nome.length == 1) {
        console.log('aqui')
        abreviacao = a_nome[0].slice(0, 1)
    } else {
        console.log('oi')
        abreviacao = a_nome[0].slice(0, 1) + a_nome[1].slice(0, 1)
    }
    foto_de_perfil.alt = abreviacao.toUpperCase()
    foto_de_perfil.src = objeto.avatar_url
    
    nivel.innerHTML = objeto.nivel || 0
    compras.innerHTML = objeto.nivel || 0
    amizades.innerHTML = null || 0// ainda não fiz isso

    bio.innerHTML = objeto.bio
}

danger_formulario.addEventListener('submit', async function deletar_conta(e) {
    e.preventDefault()

    const form = new FormData(danger_formulario)
    const texto = form.get('excluir-conta')
    if (texto === 'EXCLUIR MINHA CONTA') {
        try {
            const resposta = await fetch(`http://127.0.0.1:5000/api/exluir-conta`, { // eu sei que era melhor ter usado o methodo DELETE, porem eu não enviei nenhuma session/cookie sem ser http only para o front ent vai por get mesmo
                method: 'GET',
                credentials: 'include'
            })
            const dados = await resposta.json()
            console.log(dados)
        } catch (e) {
            console.error(e)
        }
    } else {
        alert('Digite novamente')
    }
})