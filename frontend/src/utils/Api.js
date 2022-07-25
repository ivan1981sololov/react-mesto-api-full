
export class Api {

    constructor(options) {

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    getInitialCards() {
        return this._getInitial('cards')
    }

    addCard(body) {
        return this._POST('cards', body);
    }

    deleteCard(id){
       return this._DELETE(`cards/${id}`)
    }

    changeLikeCardStatus(id, status, user){
        if(status) {
            return this._PUT(`cards/${id}/likes`, user)     
        } else {
            return this._DELETE(`cards/${id}/likes`)    
        }
    }

    getUserInfo() {
        return this._getInitial('users/me')
    }

    setUserInfo(body) {
        return this._PATCH(body, `users/me`)
    }

    setAvatar(body){
        return this._PATCH(body, `users/me/avatar`)
    }

    _getInitial(path) {
        return fetch(this.baseUrl + path, {
            headers: this.headers

         }).then(res => {
            return this._checkResponse(res)
//            console.log(res.json())
//            console.log()
         })

    }

    _PATCH(body, path) {
        path = path != undefined ? `/${path}` : '/';
        return fetch(this.baseUrl + path, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
    }

    _POST(path, body) {
        return fetch(this.baseUrl+path, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => this._checkResponse(res))
        .then(result => {
            return result
        })
    }

    _DELETE(path) {
        return fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            return result
        })
    }

    _PUT(id, body){
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => {
            return this._checkResponse(res);
        }).then((result) => {
            console.log(result)
            return result
        })
    }

    _checkResponse(res) {
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: '446e7ea3-0df9-437f-a6c2-d22adf8a9199',
        'Content-Type': 'application/json'
    }
});

export default api;
