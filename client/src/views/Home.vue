<template>
  <div class="home grid">
    <header>
      <h1>Gloomhaven Player Tools</h1>
    </header>
    <div class="modifier-deck-wrapper">
      <h2>Modifier Deck</h2>
      <modifier-deck :cards="cards"></modifier-deck>
    </div>
    <div class="trackers-wrapper">
      <h2>Trackers</h2>
      <div class="trackers">
        <tracker-widget
          class="health-tracker"
          v-model="hp"
          :min-count="0"
          label="HP"
        ></tracker-widget>
        <tracker-widget
          class="health-tracker"
          v-model="xp"
          :min-count="0"
          label="XP"
        ></tracker-widget>
        <tracker-widget
          class="coin-tracker"
          v-model="coins"
          :min-count="0"
          label="Coins"
        ></tracker-widget>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TrackerWidget from '@/components/TrackerWidget.vue';
import ModifierDeck from '@/components/ModifierDeck.vue';

export default {
  name: 'Home',
  components: {
    TrackerWidget,
    ModifierDeck,
  },
  data: () => ({
    cards: {
      '-2': 0,
      '-1': 1,
      '+0': 2,
      '+1': 7,
      '+2': 2,
      '+1 (Roll)': 4,
      x2: 1,
      miss: 1,
    },
    hp: 20,
    xp: 0,
    coins: 0,
  }),
};
</script>
