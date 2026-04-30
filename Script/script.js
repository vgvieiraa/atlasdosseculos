const btn = document.querySelector('#enviarbtn');
const section = document.querySelector('#formcont');

btn.addEventListener('click', function(event) {
    event.preventDefault();

    const iname = document.querySelector('#inome').value
    const isobrenome = document.querySelector('#isobrenome').value
    const iemail = document.querySelector('#iemail').value
    const imessage = document.querySelector('#imensagem').value

    console.table([iname, isobrenome, iemail, imessage])

    section.innerHTML = `Obrigado, ${iname}, por entrar em contato conosco! Em breve, responderemos sua mensagem enviada para o email ${iemail}.`

})

function menushow() {
    let mobilemenu = document.querySelector('.mobilemenu');
    if (mobilemenu.classList.contains('open')) {
        mobilemenu.classList.remove('open');
    } else {
        mobilemenu.classList.add('open');
    }
}

