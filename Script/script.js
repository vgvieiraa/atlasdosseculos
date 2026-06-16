const btn = document.querySelector('#enviarbtn');
const section = document.querySelector('#formcont');

if (btn && section) {
    btn.addEventListener('click', function(event) {
        event.preventDefault();

        const iname = document.querySelector('#inome').value;
        const isobrenome = document.querySelector('#isobrenome').value;
        const iemail = document.querySelector('#iemail').value;
        const imessage = document.querySelector('#imensagem').value;

        console.table([iname, isobrenome, iemail, imessage]);

        section.innerHTML = `Obrigado, ${iname}, por entrar em contato conosco! Em breve, responderemos sua mensagem enviada para o email ${iemail}.`;
    });
}


const navbar = document.querySelector('.navbar');
const navlist = document.querySelector('.navlist');
const navul = document.querySelector('.navlist ul');
const mobilemenu = document.querySelector('.mobilemenu');
const mobileul = document.querySelector('.mobilemenu ul');

const itensMoveis = Array.from(document.querySelectorAll('.navlist .navintem'));

function menushow() {
    mobilemenu.classList.toggle('open');
}

function devolverItensParaNavbar() {
    const fixos = document.querySelectorAll('.navlist .navintemf');
    const primeiroFixoDoFim = fixos[1];

    itensMoveis.forEach(function(item) {
        navul.insertBefore(item, primeiroFixoDoFim);
    });
}

function moverUltimoItemParaMenu() {
    const itensNaBarra = Array.from(navul.querySelectorAll('.navintem'));

    if (itensNaBarra.length === 0) {
        return;
    }

    const ultimoItem = itensNaBarra[itensNaBarra.length - 1];

    mobileul.prepend(ultimoItem);
}

function ajustarMenu() {
    mobilemenu.classList.remove('open');

    devolverItensParaNavbar();

    navbar.classList.remove('tem-menu');

    if (navul.scrollWidth <= navlist.clientWidth) {
        return;
    }

    navbar.classList.add('tem-menu');

    while (navul.scrollWidth > navlist.clientWidth) {
        const aindaTemItemMovel = navul.querySelector('.navintem');

        if (!aindaTemItemMovel) {
            break;
        }

        moverUltimoItemParaMenu();
    }
}

document.addEventListener('DOMContentLoaded', ajustarMenu);
ajustarMenu();
window.addEventListener('resize', ajustarMenu);

document.addEventListener('DOMContentLoaded', function() {
    const imagens = document.querySelectorAll('main img');

    if (imagens.length === 0) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    lightbox.innerHTML = `
        <button class="fechar-lightbox" aria-label="Fechar imagem">×</button>
        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const imagemGrande = lightbox.querySelector('img');
    const botaoFechar = lightbox.querySelector('.fechar-lightbox');

    let zoom = 1;

    function aplicarZoom() {
        imagemGrande.style.transform = `scale(${zoom})`;
    }

    function abrirLightbox(imagem) {
        imagemGrande.src = imagem.src;
        imagemGrande.alt = imagem.alt;

        zoom = 1;
        imagemGrande.style.transformOrigin = 'center center';
        aplicarZoom();

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function fecharLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';

        zoom = 1;
        imagemGrande.style.transformOrigin = 'center center';
        aplicarZoom();

        imagemGrande.src = '';
        imagemGrande.alt = '';
    }

    function aumentarZoom() {
        zoom += 0.2;

        if (zoom > 4) {
            zoom = 4;
        }

        aplicarZoom();
    }

    function diminuirZoom() {
        zoom -= 0.2;

        if (zoom < 1) {
            zoom = 1;
        }

        aplicarZoom();
    }

    function resetarZoom() {
        zoom = 1;
        imagemGrande.style.transformOrigin = 'center center';
        aplicarZoom();
    }

    function mudarOrigemDoZoom(event) {
        const tamanhoImagem = imagemGrande.getBoundingClientRect();

        const posicaoX = event.clientX - tamanhoImagem.left;
        const posicaoY = event.clientY - tamanhoImagem.top;

        const porcentagemX = (posicaoX / tamanhoImagem.width) * 100;
        const porcentagemY = (posicaoY / tamanhoImagem.height) * 100;

        imagemGrande.style.transformOrigin = `${porcentagemX}% ${porcentagemY}%`;
    }

    imagens.forEach(function(imagem) {
        imagem.addEventListener('click', function() {
            abrirLightbox(imagem);
        });
    });

    botaoFechar.addEventListener('click', fecharLightbox);

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            fecharLightbox();
        }
    });

    lightbox.addEventListener('wheel', function(event) {
        if (!lightbox.classList.contains('open')) {
            return;
        }

        if (!event.ctrlKey) {
            return;
        }

        if (event.target !== imagemGrande) {
            return;
        }

        event.preventDefault();

        mudarOrigemDoZoom(event);

        if (event.deltaY < 0) {
            aumentarZoom();
        } else {
            diminuirZoom();
        }
    }, { passive: false });

    document.addEventListener('keydown', function(event) {
        if (!lightbox.classList.contains('open')) {
            return;
        }

        if (event.key === 'Escape') {
            fecharLightbox();
        }

        if (event.key === '+' || event.key === '=') {
            imagemGrande.style.transformOrigin = 'center center';
            aumentarZoom();
        }

        if (event.key === '-' || event.key === '_') {
            imagemGrande.style.transformOrigin = 'center center';
            diminuirZoom();
        }

        if (event.key === '0') {
            resetarZoom();
        }
    });
});