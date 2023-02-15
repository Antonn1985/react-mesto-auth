import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, openImagePopup, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDelete = (
        `elements__trash ${isOwn && 'elements__trash_active'}`
    );
    const link = 'link';
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like-heart ${isLiked && 'elements__like-heart_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
        openImagePopup()
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };


    return (
        <div className="elements__element">
            <div className="elements__top">
                {isOwn && <button type="button" className={`${cardDelete} ${link}`} onClick={handleDeleteClick} />}
                <img className="elements__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            </div>
            <div className="elements__bottom">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={`${cardLikeButtonClassName} ${link}`} onClick={handleLikeClick} />
                    <span className="elements__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;