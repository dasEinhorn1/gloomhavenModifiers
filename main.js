Vue.component('modifier-card', {
  template: `
    <div class='card'>
      <p class='card-name'>{{name}}</p>
    </div>
  `,
  props: ['name', 'id', 'once'],
});

Vue.component('tracker-widget', {
  template: `
    <div class="tracker">
      <label>{{ label }}</label>
      <button class="decrease" type="button" name="decrease" @click="dec()">-</button>
      <input type="text" v-model.number="counter" />
      <button class="increase" type="button" name="increase" @click="inc()">+</button>
    </div>
  `,
  props: ['label', 'count', 'max-count', 'min-count'],
  model: {
    prop: 'count',
    event: 'change',
  },
  computed: {
    counter: {
      get() {
        return this.count;
      },
      set(newV) {
        if (
          (this.maxCount !== undefined && newV > this.maxCount)
          || (this.minCount !== undefined && newV < this.minCount)
        ) {
          return;
        }
        this.$emit('change', newV || 0);
      },
    },
  },
  methods: {
    inc() {
      if (this.maxCount !== undefined && this.count + 1 > this.maxCount) {
        return;
      }
      this.counter += 1;
    },
    dec() {
      if (this.minCount !== undefined && this.count - 1 < this.maxCount) {
        return;
      }
      this.counter -= 1;
    },
  },
});

const app = new Vue({
  el: '#app',
  data: {
    message: 'hello!',
  },
});
