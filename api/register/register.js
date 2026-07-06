const formulario = document.getElementById('form-register')

const botao = document.getElementById('codigo-button')

const codigo_container = document.querySelector('.codigo-container')
let email = ""

formulario.addEventListener('submit', function(e) {
    e.preventDefault()

    const rawdados = new FormData(formulario)
    const dados = Object.fromEntries(rawdados)
    email = String(dados['email'])

    fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados['stats_conta'] == '0') {
            alert('Conta já existente')
        } else {
            console.log("Pelo menos a conta não existe -1 problema")
            codigo_container.style.display = 'flex'
        }
    })
})

botao.addEventListener('click', function() {
    const input = document.getElementById('codigo-input')
    const num = input.value

    if(Number.isFinite(Number(num)) && String(num).length == "6") {
        fetch('http://127.0.0.1:5000/api/codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'codigo': num, 'email': email})
        })
        .then(res => res.json())
        .then(dado => {
            if (dado['stats_conta'] == "2") {
                alert('codigo certo')
            } else if (dado['stats_conta'] == "3") {
                alert("errado")
            } else if (dado['stats_conta'] == "4") {
                alert("Senha invalida")
            }
        })
    } else{
        alert("Digite um codigo válido")
    }
})