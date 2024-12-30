const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Отдаем статические файлы, включая JSON
app.use(express.static(path.join(__dirname, 'public')));

// Роут для отдачи quiz_questions.json
app.get('/quiz_questions', (req, res) => {
  res.sendFile(path.join(__dirname, 'quiz_questions.json'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
