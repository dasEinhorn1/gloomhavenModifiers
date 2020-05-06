const modDeck = new ModifierDeck({
  '-2': 0,
  '-1': 1,
  '+0': 2,
  '+1': 7,
  '+2': 2,
  '+1 (Rolling)': 2,
  'x2': 1,
  'miss': 1
})

function makeCardElement(card) {
  const cardEl = document.createElement('div')
  cardEl.className = 'card'
  cardEl.innerHTML = `
    <p class='card-name'>${card.name}</p>
    <p class='card-id'>${card.id}</p>
  `;
  cardEl.class
  return cardEl
}

function resetPlayed() {
  const played = document.getElementById('played')
  played.innerHTML = ''
}

function showPlayed() {
  document.getElementById('played')
  
}

document.getElementById('draw-card').onclick = function () {
  const card = modDeck.draw()
  if (card === undefined) {
    console.log('cannot draw');
  } else {
    console.log(card);
    const played = document.getElementById('played')
    played.prepend(makeCardElement(card))
  }
}

document.getElementById('shuffle-cards').onclick = function () {
  modDeck.shuffle()
  resetPlayed()
}

document.getElementById('add-card').onclick = function () {
  const cardName = document.getElementById('new-card-name').value
  const cardImage = document.getElementById('new-card-image').value
  const onceOnly = document.getElementById('one-timer').checked

  modDeck.add([new Card(cardName, cardImage, onceOnly)])
}
