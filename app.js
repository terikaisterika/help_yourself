const express = require('express');
const app = express();

const host = '127.0.0.1';
const port = 7000;
const bodyParser = require('body-parser');
const urlEncoder = bodyParser.urlencoded({
  extended: false,
});
app.set('views', './views/');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', {
    title: 'А стоит ли двигаться дальше?',
    textButtonYes: 'Да, хочу',
    textButtonNo: 'Нет, не хочу. Мне и так норм',
    buttonClass: 'button',
  });
});
app.get('/normal', function (req, res) {
  res.render('fine', {
    title: 'Тогда норм',
  });
});
const mental_state = require('./helpers/mental_state');
app.get('/help_yourself', urlEncoder, function (req, res) {
  res.render('help_yourself', {
    title: 'А что не так?',
  });
});
app.post('/help_yourself', urlEncoder, function (req, res) {
  if (!req.body) res.sendStatus(400);
  console.log(mental_state(req.body.mental_state));
  console.log(req.body.mental_state);
  res.render('answer', {
    title: 'Если честно, я не знаю, что с Вами',
    answer: mental_state(req.body.mental_state),
  });
});

app.use((req, res, next) => {
  res.status(404).type('text/html');
  res.render('error', {
    title: 'По идее ошибка 404',
    textButton: 'Я просто кнопка и просто рада, что ты меня нашел.',
  });
});
app.listen(port, host, () => {
  console.log(`Server running http://${host}:${port}`);
});
