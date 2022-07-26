import React, { useEffect,useContext, useState } from 'react';
import CardsContext from '../context/CardsContext';

import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card';

const Main = ({
    onEditProfile, 
    onAddPlace, 
    onEditAvatar,
    onCardClick, 
    cards, 
    onDeleteCard,
    onCardLike, 
    onCardDelete
}) => {    
    const {currentUser} = React.useContext(CurrentUserContext);
    
    const handleEditAvatarClick = () => {
        onEditAvatar(true)
    }

    const handleEditProfileClick = () => {
        onEditProfile(true)
    }

    const handleAddPlaceClick = () => {
        onAddPlace(true)
    }
    
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar" onClick={handleEditAvatarClick}>
                    <img src={currentUser.avatar} alt="Аватар профиля"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">
                        {currentUser.name}
                    </h1>
                    <button onClick={handleEditProfileClick} type="button" className="profile__edit-button"></button>
                    <p className="profile__description">
                        {currentUser.about}
                    </p>
                </div>
                <button
                    type="button" 
                    className="profile__add-button"
                    onClick={handleAddPlaceClick}
                    ></button>
            </section>
            <section className="elements">
                {
                    cards.map(card => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}    
                        />
                    ))
                }
            </section>
        </main>
    );
};

export default Main;