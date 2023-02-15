import PopupWithForm from './PopupWithForm';
import React from 'react';
import { useState } from 'react';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    };

    function handleChangeDescription(e) {
        setLink(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
        setLink('');
        setName('')
    }

    return (
        <PopupWithForm onClose={onClose} name="photo"
            title="Новое место" buttonText="Создать" isOpen={isOpen} onSubmit={handleSubmit}>
            <input
                type="text"
                className="form__input form__input_type_picture-name"
                id="picture-name-input"
                name="name"
                placeholder="Название"
                required=""
                minLength={2}
                maxLength={30}
                onChange={handleChangeName}
                value={name || ''}
            />
            <span className="form__input-error picture-name-input-error" />
            <input
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="form__input form__input_type_picture-link"
                id="picture-link-input"
                required=""
                onChange={handleChangeDescription}
                value={link || ''}
            />
            <span className="form__input-error picture-link-input-error" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;