require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const NotFound = require('./errors/NotFound');

const PORT = 3000;
const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const allowedCors = [
  'https://domain.students.cohort-39.nomoredomains.xyz',
  '*',
  'localhost:3000'
];

if (process.env.NODE_ENV !== 'production') {

  process.env.NODE_ENV = 'development'

}

console.log(process.env.NODE_ENV);

app.use(function(req, res, next) {
    const { origin } = req.headers;
	if (allowedCors.includes(origin)) {
	    res.header('Access-Control-Allow-Origin', origin);
	}
	const { method } = req;

	const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
	const requestHeaders = req.headers['access-control-request-headers']; 

	if (method === 'OPTIONS') {
	    res.header('Access-Control-Allow-Headers', requestHeaders);
      res.header('Access-Control-Allow-Private-Network', true);
	    return res.end();
	} 

  	next();
}); 

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());

app.use(requestLogger); 

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value.match(/https?:\/\/(www\.)?[-\w@:%\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\+~#=//?&]*)/i);
      }
      return helper.message('Невалидный url');
    }),
  }),
}), createUser);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCards);

app.all('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  // ...
}); 

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
