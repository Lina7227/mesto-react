import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userInfo, setUserInfo] = React.useState({userName:'', userDescription:'', userAvatar:''});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        const userProfil = api.getInfoUserData();
        const cardsVew = api.getInitialCards();
        Promise.all([userProfil, cardsVew])
        .then((data) => {
            setUserInfo({
                userName: data[0].name,
                userDescription: data[0].about,
                userAvatar: data[0].avatar
            });
            setCards(data[1]);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }, [])
    

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__edit-avatar">
                    <img src={`${userInfo.userAvatar}`} alt="автарка пользователя" className="profile__avatar"/>
                    <button type="button" aria-label="открыть поле добавления аватарки" onClick={onEditAvatar} className="profile__avatar-button"></button>
                </div>
                
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{userInfo.userName}</h1>
                        <p className="profile__subtitle">{userInfo.userDescription}</p>
                    </div>
                    
                    <button type="button" aria-label="открыть попап" className="profile__edit-button" onClick={onEditProfile}></button> 
                </div>
                <button type="button" aria-label="открыть поле добавления фото" className="profile__add-button" onClick={onAddPlace}></button>
            </section>  


            <section className="elements">
                <ul className="elements__table">
                    {cards.map((card) => {
                        return (
                        <Card
                            key={card._id}
                            name={card.name}
                            link={card.link}
                            likes={card.likes.length}
                            card={card}
                            onCardClick={onCardClick}
                        />
                        )
                    })}

              
                </ul>

            </section>
      

        </main>
    );
}

export default Main;