import axios from 'axios';
import _ from 'lodash';

// Вставить свой api_key
const API_KEY = '738fc2a18e3d479eb5f711627925b2bc';

// Метод для получения gif по ключевому слову
// https://developers.giphy.com/docs/api/endpoint#search
export default function getGiphy(q) {
    const endpoint = 'https://api.giphy.com/v1/gifs/search';
    const offset = Math.ceil(Math.random() * 500);

    return axios({
        url: endpoint,
        params: { api_key: API_KEY, q, limit: 15, offset }
    }).then(response => {

        // Вытаскиваем из ответа от api url анимаций
        return response.data.data
            .map(item => _.get(item, 'images.preview_gif.url'))
            .filter(Boolean)
    });
};
