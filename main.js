const BLESS_CARD = {
  name: "x2 (bless)",
  once: true
};

const CURSE_CARD = {
  name: "miss (curse)",
  once: true
};

Vue.component("modifier-card", {
  template: `
    <div class='card'>
      <p class='card-name'>{{name}}</p>
    </div>
  `,
  props: ["name", "id", "once"]
});

Vue.component("modifier-deck", {
  template: `
    <div class='mod-deck'>
      <div class="controls">
        <button @click="shuffle(true)">Shuffle</button>
        <button @click="reset(true)">Full Reset</button>
        <button @click="addBless()">+ Bless</button>
        <button @click="addCurse()">+ Curse</button>
      </div>
      <div class='deck'>
        <div @click="draw()" class="draw-deck card">
          <p class='card-name'>Deck ({{cardsLeft}})</p>
        </div>
        <div class='played-tray'>
          <p v-show="needsShuffle">You need to shuffle after this round</p>
          <button class="close" @click="showPlayed = false" v-show="showPlayed">X</button>
          <ul :class="{played:true, 'show-all': showPlayed}" @click="showPlayed = true">
            <modifier-card
              v-for="card in played.slice().reverse()"
              :name="card.name"
              :once="card.once || false"/>
          </ul>
        </div>
      </div>
    </div>
  `,
  props: ["cards"],
  data: function() {
    return {
      deck: [],
      played: [],
      showPlayed: false
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
      return (
        this.played.filter(c => c.name == "miss" || c.name === "x2").length > 0
      );
    }
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
      for (var i = 0; i < count; i++) {
        this.deck.push(BLESS_CARD);
      }
      this.shuffle(false);
    },
    addCurse(count = 1) {
      for (var i = 0; i < count; i++) {
        this.deck.push(CURSE_CARD);
      }
      this.shuffle(false);
    },
    reset(fully = false) {
      if (fully) {
        this.deck = this.deck.filter(c => !c.once);
      }
      this.deck = this.deck.concat(this.played.filter(c => !c.once));
      this.played = [];
    },
    shuffle(reset = true) {
      if (reset) {
        this.reset();
      }
      var m = this.deck.length,
        t,
        i;
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
  },
  created() {
    this.deck = Object.entries(this.cards || {}).reduce(
      (dk, [cardName, cardCount]) => {
        for (let ct = 0; ct < cardCount; ct++) {
          dk.push(new Card(cardName));
        }
        return dk;
      },
      []
    );
    this.shuffle();
  }
});

const app = new Vue({
  el: "#app",
  data: {
    message: "hello!",
    cards: {
      "-2": 0,
      "-1": 1,
      "+0": 2,
      "+1": 7,
      "+2": 2,
      "+1 (Roll)": 4,
      x2: 1,
      miss: 1
    }
  }
});
