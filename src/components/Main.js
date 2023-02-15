import pencil from '../images/pencil.svg'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Main({ onEditAvatar, onAddPlacePopup, onEditProfile, onCardClick, openImagePopup, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile" aria-label="аватар">
        <div className="profile__photo link" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          <div className="profile__avatar-mask">
            <img
              className="profile__avatar-edit"
              src={pencil}
              alt="карандаш"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button link" onClick={onEditProfile} />
          <h2 className="profile__profession">{currentUser.about}</h2>
        </div>
        <button type="button" className="profile__add-button link" onClick={onAddPlacePopup} />
      </section>
      <section className="elements page__elements" aria-label="фото">
        {cards.map((card) => {
          return (
            <Card card={card} key={card._id} onCardClick={onCardClick}
              openImagePopup={openImagePopup} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          )
        })
        }
      </section>
    </main>
  );
}

export default Main;