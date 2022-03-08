let musicas = [
  {
    titulo: "Do I Wanna Know?",
    artista: "Arctic Monkeys",
    src: "music/01_Do_I_Wanna_Know.mp3",
    img: "img/arctic.jpg",
  },
  {
    titulo: "Sweet Child O' Mine",
    artista: "Guns N' Roses",
    src: "music/Sweet Child O' Mine.mp3",
    img: "img/guns.jpg",
  },
  {
    titulo: "Back In Black",
    artista: "AC/DC",
    src: "music/ACDC - Back In Black (Official Music Video).mp3",
    img: "img/ac_dc.jpg",
  },
];

let musica = document.querySelector("audio");
let indexMusica = 0;

let duracaoMusica = document.querySelector(".fim");
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");

renderizarMusica(indexMusica);

// Events
document.querySelector(".botao-play").addEventListener("click", tocarMusica);

document.querySelector(".botao-pause").addEventListener("click", pausarMusica);

musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".anterior").addEventListener("click", () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
});

document.querySelector(".proxima").addEventListener("click", () => {
  indexMusica++;
  if (indexMusica > 2) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

// Functions
function renderizarMusica(index) {
  musica.setAttribute("src", musicas[index].src);
  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });
}

function tocarMusica() {
  musica.play();
  document.querySelector(".botao-pause").style.display = "block";
  document.querySelector(".botao-play").style.display = "none";
}

function pausarMusica() {
  musica.pause();
  document.querySelector(".botao-pause").style.display = "none";
  document.querySelector(".botao-play").style.display = "block";
}

function atualizarBarra() {
  let barra = document.querySelector("progress");
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  let tempoDecorrido = document.querySelector(".inicio");
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }

  return campoMinutos + ":" + campoSegundos;
}
