import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  
  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});


  function handleEditAvatarClick() {

    onEditAvatarPopupOpen(true);
    
  }

  function handleEditProfileClick() {

    onEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {

    onAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {

    onEditAvatarPopupOpen(false);
    onEditProfilePopupOpen(false);
    onAddPlacePopupOpen(false);
    setSelectedCard({link: '', name: ''});
  }
  
  return (
    <div className="page">

        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          />
        <Footer/>

        <PopupWithForm
          name="edit_profile"
          content="edit"
          close="profile"
          namef="user"
          form="profile"
          title="Редактировать профиль"
          button="add"
          subtitle="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
            <fieldset className="form__input-container">
              <input 
                  type="text" 
                  className="form__item form__item_input_name" 
                  id="firstname"
                  name="name"
                  required
                  minLength="2"
                  maxLength="40" 
                  autoComplete="off"
                  placeholder="Имя"/>
              <span id="firstname-error" className="error"></span>
              <input 
                  type="text" 
                  className="form__item form__item_input_job" 
                  id="jobname"
                  name="job"
                  required
                  minLength="2"
                  maxLength="200"
                  autoComplete="off"
                  placeholder="введите свою специальность"/>
              <span id="jobname-error" className="error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="edit_element"
          content="edit"
          close="element"
          namef="image"
          form="img"
          title="Новое место"
          button="add"
          subtitle="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
            <fieldset className="form__input-container">
              <input 
                  type="text" 
                  className="form__item form__item_input_title"
                  id="title" 
                  name="name" 
                  required
                  minLength="2"
                  maxLength="30"
                  autoComplete="off"
                  placeholder="Название"/>
              <span id="title-error" className="error"></span> 
              <input 
                  type="url" 
                  className="form__item form__item_input_link"
                  id="link" 
                  name="link" 
                  required
                  autoComplete="off"
                  placeholder="Ссылка на картинку"/>
              <span id="link-error" className="error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          content="avatar"
          close="avatar"
          namef="avatar"
          form="avatar"
          title="Обновить аватар"
          button="add"
          subtitle="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
            <fieldset className="form__input-container">
                
                <input 
                    type="url" 
                    className="form__item form__item_input_avatar"
                    id="avatar" 
                    name="avatar" 
                    required
                    autoComplete="off"
                    placeholder="Ссылка на аватар"/>
                <span id="avatar-error" className="error"></span>
            </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="remove"
          content="remove"
          close="remove"
          namef="remove"
          form="remove"
          title="Вы уверены?"
          button="add-remove"
          subtitle="Да"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

    </div>
  );
}

export default App;
