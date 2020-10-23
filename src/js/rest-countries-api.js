const url = 'https://restcountries.eu/rest/v2/name/';

export default {
    fetchArticles(query) {
        const params = `${query}`;
        return fetch(url + params).then(res => res.json());
    }
}
