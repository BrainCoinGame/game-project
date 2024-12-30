<template>
  <div class="dark-theme">
    <div class="game-container">
      <!-- Отображение графического прогресса уровней -->
      <div class="level-progress">
        <div class="levels">
          <div
            v-for="(level, index) in levels"
            :key="index"
            class="level"
            :class="{ active: index <= currentLevelIndex, 'level-transition': levelTransition }"
          >
            <div class="level-price">{{ level.price }}</div>
            <div class="level-name">{{ level.name }}</div>
          </div>
        </div>
      </div>

      <!-- Отображение цены за текущий вопрос -->
      <div class="question-price">
        <span>Цена вопроса: {{ currentQuestion.price }}</span>
      </div>

      <!-- Контейнер с игроками -->
      <div class="players-container">
        <div class="player-zone" v-for="player in players" :key="player.id">
          <img :src="player.avatar" alt="Avatar" class="player-avatar" />
          <h3>{{ player.name }}</h3>
          <div class="player-coins">Coins: {{ player.coins }}</div>
        </div>
      </div>

      <!-- Вопрос и ответы -->
      <div class="question-area">
        <div>{{ timer }}s</div>
        <h2>{{ currentQuestion.question }}</h2>
        <div class="answers-grid">
          <button
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            class="answer-button"
            :class="{ selected: selectedAnswer === index }"
            @click="selectAnswer(index)"
          >
            {{ answer }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      timer: 15, // Устанавливаем начальный таймер на 15 секунд
      selectedAnswer: null,
      currentLevelIndex: 0, // Индекс текущего уровня
      levelTransition: false, // Для анимации перехода на новый уровень
      levels: [
        { name: "1-й уровень", price: 100 },
        { name: "2-й уровень", price: 1500 },
        { name: "3-й уровень", price: 2500 },
        { name: "4-й уровень", price: 3500 },
        { name: "5-й уровень", price: 4500 },
        { name: "6-й уровень", price: 5500 },
        { name: "7-й уровень", price: 6500 },
        { name: "8-й уровень", price: 7500 },
        { name: "9-й уровень", price: 9000 },
        { name: "10-й уровень", price: 10000 },
      ],
      questions: [
        {
          question: "Какой океан самый большой?",
          answers: ["Атлантический", "Тихий", "Индийский", "Арктический"],
          correctAnswer: 1,
          price: 1000,
        },
        {
          question: "Сколько планет в Солнечной системе?",
          answers: ["8", "9", "10", "7"],
          correctAnswer: 0,
          price: 2000,
        },
        {
          question: "Какой язык самый распространённый в мире?",
          answers: ["Английский", "Китайский", "Испанский", "Русский"],
          correctAnswer: 1,
          price: 3000,
        },
        {
          question: "Что является столицей Японии?",
          answers: ["Пекин", "Токио", "Сеул", "Бангкок"],
          correctAnswer: 1,
          price: 5000,
        },
        {
          question: "Кто написал 'Войну и мир'?",
          answers: ["Достоевский", "Пушкин", "Толстой", "Гоголь"],
          correctAnswer: 2,
          price: 10000,
        },
      ],
      currentQuestionIndex: 0, // Индекс текущего вопроса
      players: [
        { id: 1, name: "Player 1", avatar: "avatar.png", coins: 1000 },
        { id: 2, name: "Player 2", avatar: "avatar.png", coins: 800 },
        { id: 3, name: "Player 3", avatar: "avatar.png", coins: 600 },
      ],
      countdownInterval: null, // Интервал для обновления таймера
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]; // Получаем текущий вопрос по индексу
    },
  },
  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer !== null) return; // Если ответ уже выбран, ничего не делаем

      this.selectedAnswer = index; // Сохраняем выбранный ответ
      const isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer; // Проверка правильности ответа

      // Если ответ правильный, добавляем монеты игрокам
      if (isCorrect) {
        this.players.forEach(player => player.coins += this.currentQuestion.price);
        this.levelTransition = true;
        this.currentLevelIndex = Math.min(this.currentLevelIndex + 1, this.levels.length - 1); // Переход к следующему уровню
      }

      // Переход к следующему вопросу через 2 секунды
      setTimeout(() => {
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
        this.selectedAnswer = null;
        this.timer = 15; // сбрасываем таймер
        this.levelTransition = false; // Отключаем анимацию
      }, 2000);
    },
    startTimer() {
      this.countdownInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--; // Уменьшаем таймер каждую секунду
        } else {
          clearInterval(this.countdownInterval); // Останавливаем таймер, когда он достигнет 0
        }
      }, 1000);
    },
  },
  mounted() {
    this.startTimer(); // Запуск таймера при монтировании компонента
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval); // Очищаем интервал перед уничтожением компонента
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.dark-theme {
  background: #121212;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 100%;
  margin: 0 auto;
}

.level-progress {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.levels {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: nowrap;
  padding: 0 20px;
  width: 100%;
}

.level {
  padding: 0.8px;
  background: #333;
  border-radius: 5px;
  text-align: center;
  width: 25px;
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.level-price {
  color: #ffd700;
  font-size: 0.6rem;
}

.level-name {
  color: #fff;
  font-size: 0.45rem;
}

.level.active {
  background: #4caf50;
}

.level-transition {
  animation: levelTransition 1s ease-out;
}

@keyframes levelTransition {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.question-price {
  text-align: center;
  font-size: 1.3rem;
  color: #ffd700;
  margin-bottom: 1rem;
}

.players-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
}

.player-zone {
  max-width: 30%;
  height: 130px;
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.player-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 0.85rem;
  margin: 0;
  color: #fff;
}

.player-coins {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #ffd700;
}

.question-area {
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.answer-button {
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background: #333;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.answer-button:hover {
  background: #555;
  transform: scale(1.05);
}

.answer-button.selected {
  background: #4caf50;
}

@media (max-width: 768px) {
  .players-container {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 1rem;
  }
  
  .level-price {
    font-size: 0.4rem;
  }

  .level-name {
    font-size: 0.3rem;
  }

  .player-zone {
    max-width: 32%;
    padding: 0.5rem;
  }

  .question-area {
    width: 100%;
  }
}
</style>

