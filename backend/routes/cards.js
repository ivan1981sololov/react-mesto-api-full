const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), createCards);

router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex()
      .required(),
  }),
}), likeCard);

router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex()
      .required(),
  }),
}), deleteCard);

router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex()
      .required(),
  }),
}), dislikeCard);

module.exports = router;
