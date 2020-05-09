<template>
  <div class="card">
    <p class="card-name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ['name', 'id', 'once'],
};
</script>
