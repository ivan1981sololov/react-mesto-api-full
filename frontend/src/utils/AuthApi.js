export const BASE_URL = 'https://mestobackend.students.nomoredomains.xyz';

const HEADERS = {
    'Content-Type': 'application/json',
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ password, email })
    })
        .then(checkResponse)
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    };
};
