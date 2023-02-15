import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { useState, useEffect, useContext } from 'react';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    };

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm onClose={onClose} name="name"
            title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                className="form__input form__input_type_name"
                id="name-input"
                placeholder="Имя"
                required=""
                minLength={2}
                maxLength={40}
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="form__input-error name-input-error" />
            <input
                type="text"
                name="about"
                className="form__input form__input_type_profession"
                id="profession-input"
                placeholder="О себе"
                required=""
                minLength={2}
                maxLength={200}
                value={description || ''}
                onChange={handleChangeDescription}
            />
            <span className="form__input-error profession-input-error" />
        </PopupWithForm>
    );
}

export default EditProfilePopup;