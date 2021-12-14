class Api{
    constructor({baseUrl, token}){
        this._baseUrl = baseUrl;
        this._token = token;
    }

    // возврат ответа сервера об ошибке
    onError = (res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    } 

    // запрос о получении информации о пользователе
    getInfoUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this.onError)
 
    }
    // сохранение данных пользователя
    setInfoUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                about: `${data.about}`,
            })
        })
        .then(this.onError)

    }
    
    // отправка нового аватара
    setAvatarUser(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this.onError)
    }

    // запрос на получение карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.onError)
            
    }

    // сохранение карточек
    addCards(data){
        return fetch(`${this._baseUrl}/cards`, {
          method:'POST',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: `${data.name}`,
            link: `${data.link}`,
          })
        })
        .then(this.onError)

    }

    // удаление карточек
    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.onError)
            
    }

    // запрос на лайки карточек
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.onError)
            
    }

    // удаление лайка с карточек
    removeLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.onError)
    }

}

const apiConfigg = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
    token: '15dc4595-bdc3-4503-bc80-ce15dbc42c36'
}

// отправка запросов
const api = new Api(apiConfigg);

export default api;