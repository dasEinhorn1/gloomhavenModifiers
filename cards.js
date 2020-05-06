const CARDS = {
  '+1': 5,
  '+2': 1,
  '+0': 6,
  '-1': 5,
  '-2': 1,
  'miss': 1,
  'crit': 1,
  'curse': 0,
  'bless': 0,
}

let currentCardId = 0;

class Card {
  constructor(name, img, once) {
    this.id = currentCardId++;
    this.name = name;
    this.img = img;
    this.once = once;
  }
}

class ModifierDeck {
  constructor(spec = {}) {
    this.deck = []
    this.played = []
    if (spec) {
      this.deck = Object.entries(spec).reduce((dk, [cardName, cardCount]) => {
        for (let ct = 0; ct < cardCount; ct++) {
          dk.push(new Card(cardName))
        }
        return dk
      }, [])
    }
  }

  draw() {
    const card = this.deck.pop()
    if (card) {
      this.played.push(card)
    }
    return card
  }

  show() {
    for (let card of this.deck) {
      console.log(card.name);
    }
  }

  add(cards, shuffle=false) {
    this.deck = this.deck.concat(cards)
    if (shuffle) {
      this.shuffle(false)
    }
  }

  remove(name, count, fromPlayed = false) {
    let numberToRemove = count
    if (fromPlayed) {
      this.played.filter()
    }
  }

  reset() {
    this.deck = this.deck.concat(this.played.filter((c) => !c.once))
    this.played = []
  }

  shuffle(reset = true) {
    if (reset) {
      this.reset()
    }
    var m = this.deck.length, t, i;
    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.deck[m];
      this.deck[m] = this.deck[i];
      this.deck[i] = t;
    }
  }
}
