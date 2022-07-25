import {Api} from "./Api"

 class AuthApi extends Api {
    constructor(options) {  
        super(options)
    }

    login(email, password) {
        return super._POST('/signin', {
            "password": password,
            "email": email
        
        })
    }
    register(email, password){
        return super._POST('/signup', {
            "password": password,
            "email": email
        })
    }

    getUserInf(jwt) {
        return fetch(this.baseUrl + '/users/me', {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }

         }).then(res => {
            return super._checkResponse(res)
         })
    }

 } 
const authApi = new AuthApi({
     baseUrl: ' https://mestobackend.students.nomoredomains.xyz',
     headers: {
        'Content-Type': 'application/json',
    }
 }) 
 
export default authApi