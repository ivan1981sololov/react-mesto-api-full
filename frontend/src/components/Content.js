import React, { useEffect } from 'react';

import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import PopupWithForm from "./PopupWithForm";

import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';



function Content({
    auth
}) {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});
    const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([])

    console.log(currentUser._id)

    const handleCardLike = (card) => {
        console.log(card.likes)
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked, currentUser).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((e) => console.log(e));
    }

    const handleCardDelete = (id) => {
        api.deleteCard(id).then(
            setCards((state) => state.filter(c => c._id !== id))
        ).catch(e => console.log(e))
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({
            open: false,
            title: '',
            img: ''
        })
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUpdateUser = (user) => {
        api.setUserInfo(user).then((newUser) => {
            setCurrentUser(newUser)
        }).then(
            closeAllPopups()
        ).catch((e) => console.log(e))
    }

    const handleUpdateAvatar = (obj) => {
        api.setUserAvatar(obj).then((newUser) => {
            setCurrentUser(newUser)
        }).then(
            closeAllPopups()
        ).catch((e) => console.log(e))
    }

    const handleAddPlace = (body) => {
        api.createNewCard(body).then((newCard) => {
            setCards([newCard, ...cards]);
        }).then(
            closeAllPopups()
        ).catch((e) => console.log(e))
    }

    useEffect(() => {
        if (auth) {
            api.getInitialCards()
                .then((cards) => {
                    setCards(cards.reverse())
                }).catch((e) => console.log(e))
        }
    }, [])

    return (
        <div>
            <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onDeleteCard={setIsDeletePopupOpen}
            />
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />

            <PopupWithForm closePopup={closeAllPopups} isOpen={isDeletePopupOpen} name={'popup-delete'} title={'Вы уверены'}>

            </PopupWithForm>
        </div>
    );
}

export default Content;