function criarElemento(nome, pontos) {
 const container = document.getElementById("container")
 const pessoa = document.getElementById("h3")
 const pontuacao = document.getElementById("h4")
 pessoa.textContent = nome;
 pontuacao.textContent = pontos;
 container.appendChild(pessoa)
 container.appendChild(pontuacao);
}

const nome = prompt("Qual o seu nome?")
document.write("Seja muito bem vindo(a)" + nome)
localStorage.setItem("nome", nome)

const nMoedas = 45;
const tinicial = 15;
let pontos = 0;
let tempo = 0;
let timer = null;

function iniciaJogo()
{
  pontos = 0;
  tempo = tinicial;
  let tela = document.getElementById("tela");
  tela.innerHTML="";

  for(let i = 0; i < nMoedas; ++i)
  {
      let moedas = document.createElement("img");
      moedas.src = "diamante.png";
      moedas.id = "m" + i;
      moedas.onclick = function()
      {
        pegaMoeda(this)
      }
      tela.appendChild(moedas);
  }

  fetch('http://localhost:5050/score')
  .then(data => {
    console.log(data);
  
    const jogadores = data;
  
    jogadores.sort((a, b) => b.pontuacao - a.pontuacao); // Classificar em ordem decrescente
  
    const top10 = jogadores.slice(0, 10); // Obter os 10 primeiros jogadores
  
    top10.forEach(jogador => {
      criarElemento(jogador.nome, jogador.pontuacao);
    });
  })

    .then(response => {

        if (!response.ok) {

          throw new Error('Erro na requisição');

       }

       return response.json();

    })

    .then(data => {

        console.log(data);

        const jogadores = data;

        jogadores.forEach(jogador => {

          criarElemento(jogador.name, jogador.pontuacao);

        });

    })

    .catch(error => {

      console.error(error);

    });

  timer = setInterval(contaTempo, 1000)
}

function pegaMoeda(moeda)
{
  
   if(tempo <=0) return;

    moeda.onclick = null;
    moeda.src="safira.png";
    ++pontos;

    let contadorP = document.getElementById("pontos");
    contadorP.innerText = pontos
}

function contaTempo()
{
    --tempo;
    let contadorTemp = document.getElementById("tempo");
    contadorTemp.innerText = tempo

    if(tempo <= 0)
 {
    clearInterval(timer)
    alert("Parabéns , você pegou " + pontos + "")
    let pontuacao = {

        pontuacao: pontos,
      
        nome: nome
      
      }
      
      
      
      fetch('http://localhost:5050/score', {
      
        method: "POST",
      
        body: JSON.stringify(pontuacao),
      
        headers: {"Content-type": "application/json; charset=UTF-8"}
      
      })
      
      .then(response => response.json()) 
      
      .then(json => console.log(json));
    iniciaJogo();
  }
}
function criarElemento(nome, pontos) {
  const tabela = document.getElementById("ranking");

  const linha = document.createElement("tr");
  const colunaNome = document.createElement("td");
  const colunaPontos = document.createElement("td");

  colunaNome.textContent = nome;
  colunaPontos.textContent = pontos;

  linha.appendChild(colunaNome);
  linha.appendChild(colunaPontos);

  tabela.appendChild(linha);
}