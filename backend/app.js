require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const validator = require('validator');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/user');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'development';
}

console.log(process.env.NODE_ENV);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mestobackend.students.nomoredomains.xyz',
    'https://domain.students.cohort-39.nomoredomains.xyz',
    'http://domain.students.cohort-39.nomoredomains.xyz',
  ],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2).required(),
    password: Joi.string().min(2).required(),
  }),
}), login);

app.use(auth);

app.use('/', routesUsers);
app.use('/', routesCards);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new ErrorNotFound('Запрашиваемый ресурс не найден'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
