import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const openImagePopup = () => setIsImagePopupOpen(true);

  useEffect(() => {
    Promise.all([api.getName(), api.getAllCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards([...cards])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false)
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.sendCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(newData) {
    api.sendName(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAvatarUser(data) {
    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page page-size">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
          onAddPlacePopup={handleAddPlaceClick} onCardClick={setSelectedCard}
          openImagePopup={openImagePopup} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} >
        </ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
