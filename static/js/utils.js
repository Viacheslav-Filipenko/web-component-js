export const request = obj => {
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

const search = async(question) => {

    return await request({
        method: 'POST',
        url: '/search',
        body: `question=${question}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })

};

// export class Autocomplete {

//     constructor(input, options) {

//         this.input = input;
//         this.options = options;
//     }

//     addActive(children) {

//         this.removeActive(children);

//         if (this.focus >= children.length) this.focus = 0;
//         if (this.focus < 0) this.focus = (this.data.length - 1);

//         children[this.focus].classList.add(this.options.active);
//     }

//     removeActive(children) {

//         for (let i = 0; i < children.length; i++) {

//             if (i != this.focus) {
//                 children[i].classList.remove(this.options.active);
//             }
//         }
//         this.click();        
//     }

//     create(element, attributes = {}) {

//         element = document.createElement(element);
        
//         Object.keys(attributes).forEach(attribute => {

//             element.setAttribute(attribute, attributes[attribute]);

//         });

//         return element;
//     } 

//     closeAllLists(element) {

//         const lists = document.querySelectorAll(`.${this.options.class}`);
//         for (let i = 0; i < lists.length; i++) {
        
//             if (element != lists[i] && element != this.input) {

//                 lists[i].parentNode.removeChild(lists[i]);
//             }
//         }
//     }

//     inputEvent() {

//         this.input.addEventListener('input', async (event) => {

//             this.closeAllLists();

//             if(!this.input.value) return false;

//             this.data = await search(this.input.value);
//             this.data = JSON.parse(this.data);
            
//             this.focus = -1;

//             const parent = this.create('div', {
//                 'id': this.input.id + this.options.id,
//                 'class': this.options.class
//             });

//             this.input.parentNode.appendChild(parent);
            
//             this.data.forEach((item) => {

//                 const child = this.create('div');
                
//                 child.innerHTML = item;

//                 const hiddenInput = this.create('input', {'type': 'hidden'});
//                 hiddenInput.value = item;

//                 child.appendChild(hiddenInput);

//                 child.addEventListener('click', (event) => {

//                     this.input.value = child.querySelector('input').value;

//                     this.closeAllLists();
//                 });

//                 parent.appendChild(child);
//             });

//         });
//     }

//     keydown() {

//         this.input.addEventListener('keydown', (event) => {

//             const parent = document.querySelector(`#${this.input.id + this.options.id}`);
//             let children;

//             if (parent) {

//                 children = parent.querySelectorAll('div');
//             }

//             if (event.keyCode == 40) {
        
//                 this.focus++;
//                 this.addActive(children);

//             } else if (event.keyCode == 38) {

//                 this.focus--;
//                 this.addActive(children);


//             } else if (event.keyCode == 13) {

//                 event.preventDefault();

//                 if (this.focus > -1) {

//                     if (children) children[this.focus].click();
//                 }
//             }
//         });
//     }

//     click() {

//         document.addEventListener('click', (event) => {
//             this.closeAllLists(event.target);
//         });
//     }
    
//     listen() {

//         this.click();        
//         this.inputEvent();
//         this.keydown();
//     }
// }

