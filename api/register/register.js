const formRegistro = document.getElementById('form-register')
const otp = document.querySelector('.codigo-container')

formRegistro.addEventListener('submit', async function enviar_registro(event) {
    event.preventDefault()

    const rawdados = new FormData(formRegistro)
    const Nformulario = Object.fromEntries(rawdados)

    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Nformulario)
        })

        const dados = await resposta.json()
        console.log(dados)

        if (dados['codigo'] == '1') {
            alert('Esse email já existe')
            window.location.href = '/pages/login'
        }
        // Abrir o codigo de email, OTP
        if (dados['status'] == '200') {
            otp.style.display = 'flex'
        } else {
            console.error(dados)
        }
    }
    catch(e) {
        console.error(e)
    }
})

const btn_reenviar = document.getElementById('codigo-button')

btn_reenviar.addEventListener('click', async function() {
    const inp_reenviar = document.getElementById('codigo-input')

    const rawdados = new FormData(formRegistro)
    const formulario = Object.fromEntries(rawdados)
    
    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'codigo': inp_reenviar.value, 'email': formulario.email})
        })
        const dados = await resposta.json()

        alert(dados['status'])
    } catch (e) {
        console.error(e)
    }
})