const template = document.createElement("template");
template.innerHTML = `

<style> 

:host {

    display: inline-flex;

}

.active {
    background-color: blue;
}

.autocomplete-items {
  width: 100%;
}

</style>

<div class="autocomplete-list">
    <input name="question" class="autocomplete-input" type="text">
</div>
<button>Click me</button>


`;

class AutocompleteSearch extends HTMLElement {
  constructor() {
    super();
    this._ShadowRoot = this.attachShadow({ mode: "open" });
    this._ShadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._ShadowRoot.querySelector(".autocomplete-input");
    this.$list = this._ShadowRoot.querySelector(".autocomplete-list");
    this.$button = this._ShadowRoot.querySelector("button");

    this.$input.addEventListener("input", this.displayList.bind(this));
    this.$input.addEventListener("keydown", this.action.bind(this));
    document.addEventListener("click", this.click.bind(this));
  }

  click(event) {
    this.closeAllLists(event.target);
  }

  removeActive(childern) {
    for (let i = 0; i < childern.length; i++) {
      if (i != this._focus) {
        childern[i].classList.remove("active");
      }
    }
  }

  closeAllLists(target) {
    const children = this._ShadowRoot.querySelectorAll(".autocomplete-items");

    children.forEach(child => {
      if (target != child && target != this.$input) {
        child.parentNode.removeChild(child);
      }
    });
  }

  addActive(childern) {
    this.removeActive(childern);

    if (this._focus >= childern.length) this._focus = 0;
    if (this._focus < 0) this._focus = childern.length - 1;

    childern[this._focus].classList.add("active");
  }

  action(event) {
    const parent = this._ShadowRoot.querySelector(".autocomplete-items");
    let childern;

    if (parent) {
      childern = parent.querySelectorAll("autocomplete-item");
    }

    if (event.keyCode == 40) {
      this._focus++;
      this.addActive(childern);
    } else if (event.keyCode == 38) {
      this._focus--;
      this.addActive(childern);
    } else if (event.keyCode == 13) {
      event.preventDefault();

      if (this._focus > -1) {
        if (childern) childern[this._focus].click();
      }
    }
  }

  displayList(event) {
    this.closeAllLists();
    if (!this.$input.value) return false;

    this._focus = -1;
    this._render();

    const childern = this._ShadowRoot.querySelectorAll("autocomplete-item");

    childern.forEach(child => {
      child.addEventListener("click", event => {
        this.$input.value = child.$input.value;
        this.closeAllLists();
      });
    });
  }

  connectedCallback() {}

  attributeChangeCallback(name, oldValue, newValue) {}

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  _render() {
    const container = document.createElement("div");
    container.classList.add("autocomplete-items");
    const autocompleteItem = document.createElement("autocomplete-item");

    this._data.forEach((element, index) => {
      const item = autocompleteItem.cloneNode(true);
      item.setAttribute("text", element);

      container.appendChild(item);
    });

    this.$list.appendChild(container);
  }
}

customElements.define("autocomplete-search", AutocompleteSearch);
