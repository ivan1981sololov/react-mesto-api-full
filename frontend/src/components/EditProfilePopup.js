import React from 'react';

import CurrentUserContext from '../context/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({
    isOpen, onClose, onUpdateUser
}) => {
    
    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('');
    const [description , setDescription] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        }); 
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 
      
    return (
        <PopupWithForm closePopup={onClose} onSubmit={handleSubmit} isOpen={isOpen} title={'Редактировать профиль'} name={'description'} >
                    <label className="form__field">
                        <input 
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            className="form__input" 
                            placeholder="Ваше имя?"  
                            name="Title" id="input-name" 
                            required minLength="2" 
                            maxLength="40"
                            
                        />
                        <span className="input-name-error form__input-error"></span>
                    </label>
                    <label className="form__field">
                        <input 
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text" 
                            className="form__input" 
                            placeholder="Чем занимаетесь?"  
                            name="Business" 
                            id="input-business" 
                            required 
                            minLength="2" 
                            maxLength="200"    
                        />
                        <span className="input-business-error form__input-error"></span>
                    </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;