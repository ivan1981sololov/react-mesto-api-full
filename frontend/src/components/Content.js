import React, { useEffect } from 'react';

import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import PopupWithForm from "./PopupWithForm";

import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import CurrentUserContext from '../context/CurrentUserContext';
import CardsContext from '../context/CardsContext';
import AddPlacePopup from './AddPlacePopup';



function Content({
    auth
}) {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([])

    const handleCardLike = (card) => {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

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
        api.setAvatar(obj).then((newUser) => {
            setCurrentUser(newUser)
        }).then(
            closeAllPopups()
        ).catch((e) => console.log(e))       
    }
    
    const handleAddPlace = (body) => {
        api.addCard(body).then((newCard) => {
            setCards([newCard, ...cards]);
        }).then(
            closeAllPopups()
        ).catch((e) => console.log(e))     
    }

    useEffect(() => {
        if(auth){
            Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user)
                setCards(cards)
            }).catch((e) => console.log(e))
        }
    }, [])
    
  return (
    <CurrentUserContext.Provider  value={currentUser}>
        <CardsContext.Provider value={cards}>
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
                
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>                

                <ImagePopup onClose={closeAllPopups} card={selectedCard}/>        
                
                <PopupWithForm closePopup={closeAllPopups} isOpen={isDeletePopupOpen} name={'popup-delete'} title={'Вы уверены'}>

                </PopupWithForm>
                
            </div>
        </CardsContext.Provider> 
    </CurrentUserContext.Provider>
  );
}

export default Content;