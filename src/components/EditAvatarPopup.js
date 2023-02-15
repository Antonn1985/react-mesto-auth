import PopupWithForm from './PopupWithForm';
import React from 'react';
import { useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = ''
    }

    return (
        <PopupWithForm onClose={onClose} name="avatar"
            title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onSubmit={handleSubmit}>
            <input
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                className="form__input form__input_type_avatar-link"
                id="avatar-link-input"
                required=""
                ref={avatarRef}
            />
            <span className="form__input-error avatar-link-input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;