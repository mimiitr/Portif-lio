
//carrossel
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const slideWidth = slides[0].getBoundingClientRect().width;

  let currentIndex = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
});


//sequencia

const personagens = ["luffy", "zoro", "nami", "usopp", "sanji"];
let sequencia = [];
let tentativa = [];
let nivel = 1;
let podeSelecionar = false;

const divSequencia = document.getElementById('sequencia');
const divMensagem = document.getElementById('mensagem');
const divNivel = document.getElementById('nivel');

function atualizarNivel() {
  divNivel.textContent = `Nível: ${nivel}`;
}

function gerarSequencia() {
  const personagemAleatorio = personagens[Math.floor(Math.random() * personagens.length)];
  sequencia.push(personagemAleatorio);
}

function mostrarSequencia() {
  divSequencia.innerHTML = '';
  divMensagem.textContent = '';
  podeSelecionar = false;

  sequencia.forEach(nome => {
    const img = document.createElement('img');
    img.src = `imagens/${nome}.png`;
    img.alt = nome;
    divSequencia.appendChild(img);
  });

  setTimeout(() => {
    divSequencia.innerHTML = '';
    divMensagem.textContent = 'Sua vez! Clique na sequência.';
    podeSelecionar = true;
  }, 5000);
}

function iniciarRodada() {
  tentativa = [];
  atualizarNivel();
  gerarSequencia();
  mostrarSequencia();
}

function verificarTentativa() {
  for (let i = 0; i < tentativa.length; i++) {
    if (tentativa[i] !== sequencia[i]) {
      alert(`Errou! Você chegou até o nível ${nivel}.`);
      reiniciar();
      return;
    }
  }

  if (tentativa.length === sequencia.length) {
    alert('Acertou! Próximo nível.');
    nivel++;
    iniciarRodada();
  }
}

document.querySelectorAll('#opcoes img').forEach(img => {
  img.addEventListener('click', () => {
    if (!podeSelecionar) return;
    const personagem = img.dataset.personagem;
    tentativa.push(personagem);
    verificarTentativa();
  });
});

document.getElementById('botao-reiniciar').addEventListener('click', reiniciar);

function reiniciar() {
  nivel = 1;
  sequencia = [];
  divMensagem.textContent = '';
  iniciarRodada();
}

window.onload = iniciarRodada;
