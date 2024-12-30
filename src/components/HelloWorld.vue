<template>
  <div class="game-container">
    <div class="players-container">
      <div v-for="(player, index) in players" :key="player.id" 
           :class="['player-zone', { 'active': currentPlayer === index }]">
        <PlayerProfile 
          :player="player"
          :isActive="currentPlayer === index"
          @use-lifeline="useLifeline"
        />
        <PlayerStats 
          :lives="player.lives"
          :coins="player.coins"
          :bonuses="player.bonuses"
        />
      </div>
    </div>

    <div class="question-area" v-if="currentQuestion">
      <div class="timer">{{ timeLeft }}s</div>
      <h2 class="question-text">{{ currentQuestion.text }}</h2>
      
      <div class="answers-grid">
        <button 
          v-for="(answer, index) in displayedAnswers" 
          :key="index"
          :class="['answer-button', {
            'eliminated': eliminatedAnswers.includes(index),
            'selected': selectedAnswer === index
          }]"
          @click="selectAnswer(index)"
          :disabled="isAnswerLocked"
        >
          {{ answer }}
        </button>
      </div>

      <div class="lifelines">
        <button 
          v-for="lifeline in availableLifelines" 
          :key="lifeline.type"
          @click="activateLifeline(lifeline.type)"
          :disabled="lifeline.used"
        >
          {{ lifeline.name }}
        </button>
      </div>
    </div>

    <div class="betting-area" v-if="isBettingPhase">
      <h3>Place your bets!</h3>
      <div class="bet-controls">
        <div v-for="player in players" :key="player.id">
          <span>{{ player.name }}</span>
          <input 
            type="number" 
            v-model.number="bets[player.id]"
            :max="currentPlayer.coins"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import PlayerProfile from './PlayerProfile.vue'
import PlayerStats from './PlayerStats.vue'

export default {
  name: 'HelloWorld',
  components: {
    PlayerProfile,
    PlayerStats
  },
  
  setup() {
    const players = ref([{
      id: 1, 
      name: 'Player 1', 
      lives: 3, 
      coins: 1000,
      bonuses: [],
      avatar: '/avatars/1.png'
    }])

    const currentPlayer = ref(0)
    const currentQuestion = ref(null)
    const timeLeft = ref(30)
    const selectedAnswer = ref(null)
    const eliminatedAnswers = ref([])
    const isAnswerLocked = ref(false)
    const bets = ref({})

    const availableLifelines = ref([
      { type: 'fifty', name: '50:50', used: false },
      { type: 'audience', name: 'Audience Help', used: false },
      { type: 'phone', name: 'Phone Friend', used: false }
    ])

    const displayedAnswers = computed(() => {
      if (!currentQuestion.value) return []
      return currentQuestion.value.answers
    })

    const isBettingPhase = computed(() => {
      // Example logic for betting phase
      return false
    })

    const startTimer = () => {
      const timer = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          clearInterval(timer)
          handleTimeUp()
        }
      }, 1000)
    }

    const selectAnswer = (index) => {
      if (isAnswerLocked.value) return
      selectedAnswer.value = index
    }

    const useLifeline = (type) => {
      const lifeline = availableLifelines.value.find(l => l.type === type)
      if (!lifeline || lifeline.used) return

      switch (type) {
        case 'fifty':
          handleFiftyFifty()
          break
        case 'audience':
          handleAudienceHelp()
          break
        case 'phone':
          handlePhoneAFriend()
          break
      }

      lifeline.used = true
    }

    const handleFiftyFifty = () => {
      const wrongAnswers = currentQuestion.value.answers
        .map((_, index) => index)
        .filter(index => index !== currentQuestion.value.correctIndex)
      
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * wrongAnswers.length)
        eliminatedAnswers.value.push(wrongAnswers[randomIndex])
        wrongAnswers.splice(randomIndex, 1)
      }
    }

    const handleAudienceHelp = () => {
      // Example: Audience help logic
    }

    const handlePhoneAFriend = () => {
      // Example: Phone a friend logic
    }

    const handleTimeUp = () => {
      isAnswerLocked.value = true
    }

    onMounted(() => {
      fetchQuestion()
      startTimer()
    })

    const fetchQuestion = async () => {
      currentQuestion.value = {
        text: 'Sample question?',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctIndex: 0
      }
    }

    return {
      players,
      currentPlayer,
      currentQuestion,
      timeLeft,
      selectedAnswer,
      eliminatedAnswers,
      isAnswerLocked,
      availableLifelines,
      displayedAnswers,
      isBettingPhase,
      bets,
      selectAnswer,
      useLifeline
    }
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.players-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.player-zone {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f5;
}

.player-zone.active {
  background: #e3f2fd;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.question-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.answer-button {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.answer-button:hover:not(:disabled) {
  background: #f5f5f5;
}

.answer-button.eliminated {
  opacity: 0.5;
  cursor: not-allowed;
}

.answer-button.selected {
  border-color: #2196f3;
  background: #e3f2fd;
}

.lifelines {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.timer {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
