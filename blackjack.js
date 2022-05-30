
var mesaSoma = 0;
var voceSoma =0;

var mesaMaoConta = 0;
var voceMaoConta = 0

var hidden;
var deck;

var pedeCarta = true;

window.onload = function() {
  buildDeck();
  shuffleDeck();
  startGame();
}

function buildDeck() {
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
  console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() *deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame(){
  hidden = deck.pop();
  mesaSoma += getValue(hidden);
  mesaMaoConta += checkAce(hidden);
  // console.log(hidden);
  // console.log(mesaSoma)
  while (mesaSoma < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src ="./cards/" + card + ".png"
    mesaSoma += getValue(card);
    mesaMaoConta += checkAce(card);
    document.getElementById("cartas-mesa").append(cardImg);
  }
  console.log(mesaSoma);

  for (let i = 0; i < 2; i++){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src ="./cards/" + card + ".png"
    voceSoma += getValue(card);
    voceMaoConta += checkAce(card);
    document.getElementById("suas-cartas").append(cardImg);
  }

  console.log(voceSoma)
  document.getElementById("pedir").addEventListener("click", pedir);
  document.getElementById("parar").addEventListener("click", parar);

}

function pedir() { 
  if (!pedeCarta) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src ="./cards/" + card + ".png"
  voceSoma += getValue(card);
  voceMaoConta += checkAce(card);
  document.getElementById("suas-cartas").append(cardImg);

  if (reduceAce(voceSoma, voceMaoConta) > 21) {
    pedeCarta = false;
  }

}

function parar() {
  mesaSoma = reduceAce(mesaSoma, mesaMaoConta);
  voceSoma = reduceAce(voceSoma, voceMaoConta);

  pedeCarta = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";

  let message = "";
  if (voceSoma > 21) {
    message = "Você perdeu!";
  }
  else if (mesaSoma > 21) {
    message = "Você venceu!";
  }
  else if (voceSoma == mesaSoma) {
    message = "Empate!"
  }
  else if (voceSoma > mesaSoma) {
    message = "Você venceu!"
  }
  else if (voceSoma < mesaSoma) {
    message = "Você perdeu!"
  }
  
  document.getElementById("mesa-soma").innerText = mesaSoma
  document.getElementById("voce-soma").innerText = voceSoma
  document.getElementById("resultado").innerText = message


}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) { //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(jogadorSoma, jogadorMaoConta) {
  while (jogadorSoma > 21 && jogadorMaoConta > 0) {
    jogadorSoma -= 10;
    jogadorMaoConta -= 1;
  }
  return jogadorSoma;
}
