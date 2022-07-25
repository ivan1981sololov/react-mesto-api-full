import React from 'react';

import CurrentUserContext from '../context/CurrentUserContext';

import trashImg from '../images/Trash.svg'
const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id; 
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden' }`
    )
    const cardLikeButtonClassName = (
        `element__like like__btn ${isLiked ? 'element__like_active' : ''}` 
    )

    const handleClick = () => {
        onCardClick({
            open: true,
            title: card.name,
            img: card.link
        })
    }

    return (
            <div className="element">
                <img 
                    onClick={() => onCardDelete(card._id)}
                    src={trashImg} alt="Мусор" 
                    className={cardDeleteButtonClassName}

                />
                <img onClick={handleClick} src={card.link} alt={card.name} className="element__image"/>
                <div className="element__wrapper">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="like">
                        <button 
                            type="button"
                            className={cardLikeButtonClassName}
                            onClick={() => onCardLike(card)}    
                        ></button>
                        <p className="element__like-quantity">{card.likes.length > 0 ? card.likes.length : ''}</p>
                    </div>
                </div>
            </div>
    );
};

export default Card;