form.onsubmit = async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const imagemInput = document.getElementById("imagem").value.trim();

  let imagem = imagemInput;

  if (!imagem) {
    const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=14ebffd151212b302e1802682b598121&query=${encodeURIComponent(titulo)}`);
    const dados = await resposta.json();
    if (dados.results.length > 0 && dados.results[0].poster_path) {
      imagem = `https://image.tmdb.org/t/p/w200${dados.results[0].poster_path}`;
    }
  }

  const novoFilme = { titulo, genero, imagem };
  filmes.push(novoFilme);
  salvar();
  render();

  form.reset();
};
