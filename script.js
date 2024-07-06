const containerVideos = document.querySelector('.videos__container');
  
async function BuscarEMostrarVideos(){
    try{
        const busca = await fetch('http://localhost:3000/videos') // Ele vai 'aguardar' que a busca seja feita para executar os códigos na sequencia
        const videos = await busca.json(); // Temos que transformá-lo em um JSON para conseguirmos manipulá-lo
            
            videos.forEach((video) => {
                containerVideos.innerHTML += `
                <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>        
                `;
            })    
    } catch(error){
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    } 
}

BuscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase(); // Deixa em letra minúscula para maior abrangimento
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }

  const botaoCategoria = document.querySelectorAll(".superior__item");

  botaoCategoria.forEach((botao) => {
      let nomeCategoria = botao.getAttribute("name");
      botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
  })
  
  function filtrarPorCategoria(filtro){
      const videos = document.querySelectorAll(".videos__item");
      for(let video of videos){
          let categoria = video.querySelector(".categoria").textContent.toLowerCase();
          let valorFiltro = filtro.toLowerCase();
  
          if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
              video.style.display = "none";
          } else {
              video.style.display = "block";
          }
      }
  }