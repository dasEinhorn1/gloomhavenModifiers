<template>
  <div class="mod-deck">
    <div class="controls">
      <button class="info" @click="shuffle(true)">Shuffle</button>
      <button class="info" @click="reset(true)">Full Reset</button>
      <button class="light" @click="addBless()">+ Bless</button>
      <button class="dark" @click="addCurse()">+ Curse</button>
    </div>
    <div class="deck">
      <div @click="draw()" :class="{ 'draw-deck': true, card: true, 'scroll-adjust': showPlayed }">
        <p class="card-name">Deck</p>
        <p class="card-count">({{ cardsLeft }})</p>
      </div>
      <hr />
      <div class="played-tray">
        <p class="warning light" v-if="needsShuffle">You need to shuffle after this round</p>
        <ul :class="{ played: true, 'show-all': showPlayed }" @click="showPlayed = !showPlayed">
          <modifier-card
            v-for="card in played.slice().reverse()"
            :key="card.name"
            :name="card.name"
            :once="card.once || false"
          >
          </modifier-card>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ModifierCard from '@/components/ModifierCard.vue';

class Card {
  constructor(name, img, once) {
    this.name = name;
    this.img = img;
    this.once = once;
  }
}

const BLESS_CARD = {
  name: 'x2 (bless)',
  once: true,
};

const CURSE_CARD = {
  name: 'miss (curse)',
  once: true,
};

function convertToDeck(cards) {
  return Object.entries(cards || {}).reduce((dk, [cardName, cardCount]) => {
    for (let ct = 0; ct < cardCount; ct++) {
      dk.push(new Card(cardName));
    }
    return dk;
  }, []);
}

export default {
  props: ['cards'],
  components: {
    ModifierCard,
  },
  data() {
    return {
      deck: [],
      played: [],
      showPlayed: false,
    };
  },
  computed: {
    cardsLeft() {
      return `${this.deck.length} left`;
    },
    blessCount() {
      return this.deck;
    },
    needsShuffle() {
      return this.played.filter((c) => c.name === 'miss' || c.name === 'x2').length > 0;
    },
  },
  methods: {
    draw() {
      const card = this.deck.pop();
      if (card) {
        this.played.push(card);
      }
      return card;
    },
    addBless(count = 1) {
      for (let i = 0; i < count; i++) {
        this.deck.push(BLESS_CARD);
      }
      this.shuffle(false);
    },
    addCurse(count = 1) {
      for (let i = 0; i < count; i++) {
        this.deck.push(CURSE_CARD);
      }
      this.shuffle(false);
    },
    reset(fully = false) {
      if (fully) {
        this.deck = this.deck.filter((c) => !c.once);
      }
      this.deck = this.deck.concat(this.played.filter((c) => !c.once));
      this.played = [];
    },
    shuffle(reset = true) {
      if (reset) {
        this.reset();
      }
      let m = this.deck.length;
      let t;
      let i;
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = this.deck[m];
        this.deck[m] = this.deck[i];
        this.deck[i] = t;
      }
    },
  },
  created() {
    this.deck = convertToDeck(this.cards);
    this.shuffle();
  },
};
</script>
