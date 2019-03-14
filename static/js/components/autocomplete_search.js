const template = document.createElement("template");
template.innerHTML = `

<style> 

:host {

    display: inline-flex;

}

</style>

<div class="autocomplete-list">
    <input class="autocomplete-input" type="text">
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
    // this.$input.addEventListener('keydown', );
  }

  displayList(event) {

    if (!this.$input.value) return false;

    this._focus = -1;
    // alert(this._data);
    this._render();
  }


  connectedCallback() {}

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  _render() {
    this._data.forEach((element, index) => {
      const autocompleteItem = document.createElement("div");
      autocompleteItem.innerHTML = element;
      this.$list.appendChild(autocompleteItem);
    });
  }
}

customElements.define("autocomplete-search-input", AutocompleteSearch);
