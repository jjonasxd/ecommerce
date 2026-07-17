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