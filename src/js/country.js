import api from './rest-countries-api';
import refs from './refs'
import oneCountry from '../templates/one-country.hbs';
import manyCountries from '../templates/many-countries.hbs'

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

refs.form.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  e.preventDefault();
  clearForm();
   const form = e.target.value;
    
  api.fetchArticles(form).then(data => {
    
      if (data.length > 10) {
          error({
              text: "Too many matches found. Please enter a more specific query!"
          });
      } else if (data.status === 404) {
        error({
          text: "No country has been found. Please enter a more specific query!"
      });
      } else if (data.length === 1) {
          listMarkup(data, oneCountry);
      } else if (data.length <= 10) {
          listMarkup(data, manyCountries);
      }
  })
  .catch(err => {
      err({
          text: "You must enter query parameters!"
      });
      console.log(err)
  })
}

function listMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  refs.list.insertAdjacentHTML('afterbegin', markup)
}

function clearForm() {
  refs.list.innerHTML = '';
}