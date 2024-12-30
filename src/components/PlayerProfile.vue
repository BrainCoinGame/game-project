<template>
    <div class="player-profile">
      <h2>{{ player.name }}</h2>
      <img :src="player.avatar" alt="Avatar" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlayerProfile',
    props: {
      player: Object
    }
  }
  </script>
  
  <style scoped>
  .player-profile {
    text-align: center;
  }
  </style>
  