import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  
  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopup, onDeleteCardPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});
  const [sbmPopupProfile, setsbmPopupProfile] = React.useState('Сохранить');
  const [sbmPopupAvatar, setsbmPopupAvatar] = React.useState('Сохранить');
  const [sbmPopupImg, setsbmPopupImg] = React.useState('Создать');
  const [sbmPopupRemove, setsbmPopupRemove] = React.useState('Да');

  


  function handleEditAvatarClick() {
    setsbmPopupAvatar('Сохранить');
    onEditAvatarPopupOpen(true);
    
  }

  function handleEditProfileClick() {
    setsbmPopupRemove('Сохранить');
    onEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setsbmPopupImg('Создать');
    onAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setsbmPopupRemove('Да');
    onDeleteCardPopup(true);
    setCardDelete(card);
    
  }

  function closeAllPopups() {

    onEditAvatarPopupOpen(false);
    onEditProfilePopupOpen(false);
    onAddPlacePopupOpen(false);
    onDeleteCardPopup(false);
    setSelectedCard({link: '', name: ''});
    setCardDelete({link: '',  name: ''});
  }

  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    }

  },[]);

  React.useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.key ==='Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keyup', handleEscapeClick);

    return () => {
      document.removeEventListener('keyup', handleEscapeClick);
    }

  },[]);
  

  React.useEffect(() => {
    Promise.all([api.getInfoUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  

  function handleCardLike(card) {
      
      const isLiked = card.likes.some(like => like._id === currentUser._id);
      
      api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
              setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
              console.log(err);
          })
  }
    
  function handleCardDelete(card) {
    setsbmPopupRemove('Удаление...')
      api.removeCard(card._id)
        .then(() => {
          const newCards = cards.filter((evt) => evt._id !== card._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleUpdateUser(user) {
    setsbmPopupProfile('Сохранение...');
    api.setInfoUserData(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    setsbmPopupAvatar('Сохранение...');
    api.setAvatarUser(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(cardNew) {
    setsbmPopupImg('Добавление...');
    api.addCards(cardNew)
      .then((cardNew) => {
        setCards([cardNew, ...cards]);
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <div className="page">
     
     <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
          cards={cards}
          />
        <Footer/>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonSbmText={sbmPopupProfile}
        /> 

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonSbmText={sbmPopupImg}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonSbmText={sbmPopupAvatar}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopup}
          onClose={closeAllPopups}
          onSubmitDeleteCard={handleCardDelete}
          card={cardDelete}
          buttonSbmText={sbmPopupRemove}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
