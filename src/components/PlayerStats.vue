<template>
    <div class="player-stats">
      <p>Lives: {{ lives }}</p>
      <p>Coins: {{ coins }}</p>
      <p>Bonuses: {{ bonuses.join(', ') }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlayerStats',
    props: {
      lives: Number,
      coins: Number,
      bonuses: Array
    }
  }
  </script>
  
  <style scoped>
  .player-stats {
    font-size: 1rem;
    padding: 1rem;
  }
  </style>
  