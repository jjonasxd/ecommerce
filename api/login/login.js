const formulario = document.getElementById('form-login')

if (!navigator.cookieEnabled) {
    window.location.href = '/pages/perfil'
}

formulario.addEventListener('submit', async function enviar_login(e) {
    e.preventDefault()

    const rawdados = new FormData(formulario)
    const ob_form = Object.fromEntries(rawdados)

    ob_form.remember = formulario.querySelector('[name="remember"]').checked
    console.log(ob_form)

    const res = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob_form),
        credentials: 'include'
    })
    const dados = await res.json()
    console.log(dados)
    if (dados.codigo == '1') {
            window.location.href = '/pages/perfil'
    } else {
            alert(dados.details)
    }
})