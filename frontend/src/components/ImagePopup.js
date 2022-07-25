import React from 'react';

const ImagePopup = ({card, onClose}) => {
    
    const handleClose = (e) => {
        const target = e.target;
        if(target.classList.contains('popup') || target.classList.contains('popup__close')){
            onClose();
        }
    }

    return (
        <div onClick={(e) => handleClose(e)} className={`popup ${card.open ? 'popup_opened': ''}`} id="image">
            <div className="image">
                <button type="button" className="popup__close" id="image-close"></button>
                <img src={card.img} alt={card.title} className="image__body"/>
                <p className="image__title">{card.title}</p>
            </div>
        </div>
    );
};

export default ImagePopup;