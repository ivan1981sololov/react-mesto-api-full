import React, { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
    isOpen, onClose, onUpdateAvatar
}) => {
    const inputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        });
      } 

      useEffect(() => {
        inputRef.current.value = '';
      }, [isOpen])
      
    return (
        <PopupWithForm closePopup={onClose} onSubmit={handleSubmit} isOpen={isOpen} title={'Обновить аватар'} name={'popup-avatar'} >
            <label className="form__field">
                <input ref={inputRef} type="url" className="form__input" placeholder="Ссылка на аватарку" name="link" id="input-avatar"  required/>
                <span className="input-avatar-error form__input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;