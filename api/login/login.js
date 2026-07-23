const formulario = document.getElementById('form-login')

formulario.addEventListener('submit', function(e) {
    e.preventDefault()

    const rawdados = new FormData(formulario)
    const dados = Object.fromEntries(rawdados)

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados),
        credentials: 'include'
    })
})

async function testar_jwt() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/me', {
            method: 'GET',
            credentials: 'include'
        })
        if (resposta.ok) {
            return true
        }
        return false
    } catch (erro) {
        console.error(erro)
        return false
    }
}

formulario.addEventListener('submit', async function enviar_login(e) {
    e.preventDefault()

    const rawdados = new FormData(formulario)
    const ob_form = Object.fromEntries(rawdados)

    if (!testar_jwt()) {
        window.location.href = '/pages/perfil'
    } else {
        const res = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ob_form)
        })
        const dados = await res.json()
        if (dados.codigo == '7') {
            window.location.href = '/pages/perfil'
        } else {
            alert(dados.details)
        }
    }
})