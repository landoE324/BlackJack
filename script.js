// Just a project for fun

var dealerSum = 0;

var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    document.getElementById("reset").addEventListener("click", reset);
}

function buildDeck() {
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    let suites = ["C","D","H","S"];
    deck = [];

    for (var i = 0; i < suites.length; i++) {
        for (var j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suites[i]);
        }
    }
   // console.log(deck);
}

function shuffleDeck() {
    for (var i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 +> (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);


  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
  }

document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    let message = "";
    if (playerSum > 21) {
        message = "You Lost!";
    }
    else if (dealerSum > 21) {
        message = "You Win!";
    }
    else if (playerSum == dealerSum) {
        message = "Tie";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;
}


function  getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
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

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10
        playerAceCount -= 1;
    }
    return playerSum;
}

function reset() {
    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    canHit = true;
    document.getElementById("dealer-cards").innerHTML = '<img id="hidden" src="./cards/back.png">';
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("player-sum").innerText = "";
    document.getElementById("results").innerText = "";
    document.getElementById("hidden").src = "";
    buildDeck();
    shuffleDeck();
    startGame();
}