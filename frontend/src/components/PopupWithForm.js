import React, { Children } from 'react';

const PopupWithForm = ({
    title, name, children, isOpen, closePopup, onSubmit
}) => {
    const handleClosPopup = (e) => {
        const target = e.target;
        if(target.classList.contains('popup') || target.classList.contains('popup__close')){
            closePopup();
        }
    }
    return (
        <div onClick={(e) => handleClosPopup(e)} className={`popup ${name} ${ isOpen ? 'popup_opened' : ''}`} id={name}>
            <div className="popup__container">
                <button
                    type="button" 
                    className="popup__close"
                    id={`${name}-close`}
                    ></button>
                <form action="/" onSubmit={(e) => onSubmit(e)} className="form form-one " name={name} id={`${name}-form`}> 
                    <h2 className="form__title">
                        {title}
                    </h2>
                    {children}
                    <button type="submit" className="form__submit">Создать</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;