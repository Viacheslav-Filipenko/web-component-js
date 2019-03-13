import { homedir } from "os";

const request = obj => {
  
  return new Promise((resolve, reject) => {
  
    const xhr = new XMLHttpRequest();

    xhr.open(obj.method || "GET", obj.url);

    if (obj.headers) {
  
      Object.keys(obj.headers).forEach(key => {
  
        xhr.setRequestHeader(key, obj.headers[key]);
  
      });
  
    }

    xhr.onload = () => {
  
      if (xhr.status >= 200 && xhr.status < 300) {
  
        resolve(xhr.response);
  
      } else {
  
        reject(xhr.statusText);
  
      }
  
    };

    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  
  });
};

const search = async (question) => {

  const data = await request({
    method: 'POST',
    url: '/search',
    body: question,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

}

document.querySelector('.nav__search__input').addEventListener('keyup', () => {

  const value = document.querySelector('.nav__search__input').value;
  if(value.length) {

    const quetion = `question=${value}`;

    search(quetion);
  
  } 
});

const autocomplete = obj => {

  let current;

  obj.input.addEventListener('input', (event) => {

    let value = this.value;

    //  close all lists
    if (!value) { return false }

    current = -1;

    const container = document.createElement('div');

    container.setAttribute('id', this.id + obj.id);
    container.setAttribute('class', obj.class);

    this.parentNode.appendChild(container);

    for (let i = 0; i < obj.data; i++) {

      const item = document.createElement('div');
      
      item.innerHTML = data[i];

      const hiddenInput = document.createElement('input');

      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.value = data[i];

      item.addEventListener('click', (event) => {

        obj.input.value = this.querySelector('input').value;

        //  close all list

      });

    }


  });

  obj.input.addEventListener('keydown', (event) => {

  const container = document.querySelector(`#${this.id}${obj.id}`);
  
  if (container) {
    const items = container.querySelectorAll('div');
  }

  if (event.keyCode == 40) {

    current++;

    addActive(items[current], items[current - 1]);

  } else if (event.keyCode == 38) {

    current--;

    addActive(items[current], items[current + 1]);

  } else if (event.keyCode == 13) {

    event.preventDefault();

    if (current > -1) {

      if (items) { items[current].click(); }
    }
  
  }

  });

  function addActive(item, previous) {

    if (!item) return false;

    removeActive(previous);

    if (current > obj.data.length) current = 0;

    if (current < 0) current = (obj.data.length - 1);

    item.classList.add(obj.active);

  }

  function removeActive(item) {

    item.classList.remove(obj.active);

  }

  function closeAllLists(item) {

    const container = document.querySelectorAll(`.${obj.class}`);

    container.forEach(element => {

      if (element != item && item != input) {
        element.parentNode.removeChild(element);
      }

    });

  }

  document.addEventListener('click', (event) => {

    closeAllLists(event.target);

  });

}

const x = document.querySelector('#myInput');

autocomplete({class: 'autocomplete-items', id: 'autocomplete-list', input:x, arr});