import React, { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({
    isOpen, onClose, onAddPlace 
}) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name,
            link
        })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return (
        <PopupWithForm closePopup={onClose} isOpen={isOpen} onSubmit={handleSubmit} title={'Новое место'} name={'cards'} >
            <label className="form__field"> 
                <input 
                    type="text"
                    value={name || ''} 
                    onChange={(e) => setName(e.target.value)}
                    className="form__input" 
                    placeholder="Название" 
                    name="name" 
                    id="input-card" 
                    minLength="2" 
                    maxLength="30" 
                    required
                />
                <span className="input-card-error form__input-error"></span>
            </label>
            <label className="form__field">
                <input 
                    type="url"
                    value={link || ''} 
                    onChange={(e) => setLink(e.target.value)} 
                    className="form__input" 
                    placeholder="Ссылка на картинку" 
                    name="link" 
                    id="input-image"  
                    required/>
                <span className="input-image-error form__input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;