<template>
  <div class="tracker">
    <label>{{ label }}</label>
    <button class="decrease" type="button" name="decrease" @click="dec()">-</button>
    <input type="text" v-model.number="counter" />
    <button class="increase" type="button" name="increase" @click="inc()">+</button>
  </div>
</template>

<script>
export default {
  name: 'TrackerWidget',
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
};
</script>
