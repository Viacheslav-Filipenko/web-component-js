const template = document.createElement("template");
template.innerHTML = `

<style>

:host{
    display: block;
    width: 100%;
}

.active{
    background-color: blue;
}


</style> 

<div class="autocomplete-item">
    <input class="autocomplete-item-input" type="hidden"> 
    <span class="autocomplete-item-text"></span>
</div>

`;

class AutocimpleteItem extends HTMLElement {
  constructor() {
    super();
    this._ShadowRoot = this.attachShadow({ mode: "open" });
    this._ShadowRoot.appendChild(template.content.cloneNode(true));

    this.$item = this._ShadowRoot.querySelector(".autocomplete-item");
    this.$input = this._ShadowRoot.querySelector(".autocomplete-item-input");
    this.$text = this._ShadowRoot.querySelector(".autocomplete-item-text");
  }

  removeActive(element) {
    element.classList.remove("active");
  }

  addActive(element) {
    element.classList.add("active");
  }

  _render() {
    this.$input.value = this._text;
    this.$text.innerHTML = this._text;
  }

  static get observedAttributes() {
    return ["text"];
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._text = newValue;
  }
}

customElements.define("autocomplete-item", AutocimpleteItem);
