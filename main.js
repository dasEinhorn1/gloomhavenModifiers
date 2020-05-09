const BLESS_CARD = {
  name: "x2 (bless)",
  once: true
};

const CURSE_CARD = {
  name: "miss (curse)",
  once: true
};

function convertToDeck(cards) {
  return Object.entries(cards || {}).reduce((dk, [cardName, cardCount]) => {
    for (let ct = 0; ct < cardCount; ct++) {
      dk.push(new Card(cardName));
    }
    return dk;
  }, []);
}

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
        <button class="info" @click="shuffle(true)">Shuffle</button>
        <button class="info" @click="reset(true)">Full Reset</button>
        <button class="light" @click="addBless()">+ Bless</button>
        <button class="dark" @click="addCurse()">+ Curse</button>
      </div>
      <div class='deck'>
        <div @click="draw()" :class="{'draw-deck':true, card:true, 'scroll-adjust': showPlayed}">
          <p class='card-name'>Deck</p>
          <p class='card-count'>({{cardsLeft}})</p>
        </div>
        <hr/>
        <div class='played-tray'>
          <p class="warning light" v-show="needsShuffle">You need to shuffle after this round</p>
          <ul :class="{played:true, 'show-all': showPlayed}" @click="showPlayed = !showPlayed">
            <modifier-card
              v-for="card in played.slice().reverse()"
              :name="card.name"
              :once="card.once || false">
            </modifier-card>
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
    this.deck = convertToDeck(this.cards);
    this.shuffle();
  }
});

Vue.component("tracker-widget", {
  template: `
    <div class="tracker">
      <label>{{ label }}</label>
      <button class="decrease" type="button" name="decrease" @click="dec()">-</button>
      <input type="text" v-model.number="counter" />
      <button class="increase" type="button" name="increase" @click="inc()">+</button>
    </div>
  `,
  props: ["label", "count", "max-count", "min-count"],
  model: {
    prop: "count",
    event: "change"
  },
  computed: {
    counter: {
      get: function() {
        return this.count;
      },
      set: function(newV) {
        if (
          (this.maxCount !== undefined && newV > this.maxCount) ||
          (this.minCount !== undefined && newV < this.minCount)
        ) {
          return;
        }
        this.$emit("change", newV || 0);
      }
    }
  },
  methods: {
    inc() {
      if (this.maxCount !== undefined && this.count + 1 > this.maxCount) {
        return;
      }
      this.counter = this.counter + 1;
    },
    dec() {
      if (this.minCount !== undefined && this.count - 1 < this.maxCount) {
        return;
      }
      this.counter = this.counter - 1;
    }
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
    },
    hp: 20,
    xp: 0,
    coins: 0
  }
});
