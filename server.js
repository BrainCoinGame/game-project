const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Раздача статических файлов (например, HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для получения вопросов викторины из JSON файла
app.get('/quiz-questions', (req, res) => {
  const quizQuestions = require('./quiz_questions.json');
  res.json(quizQuestions);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
