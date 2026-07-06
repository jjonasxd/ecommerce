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
        body: JSON.stringify(dados)
    })
})