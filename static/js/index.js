import {request, Autocomplete} from './utils.js';


const input = document.querySelector('#myInput');

const autocomplete = new Autocomplete(input, {
  active: 'autocomplete-active',
  class: 'autocomplete-items',
  id: 'autocomplete-list'
});

autocomplete.listen();