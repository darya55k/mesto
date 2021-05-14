export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	  }
	
	  renderCards() {
		this._items.forEach(card => {
		  this._renderer(card);
		})
	  }
	
	  addItem(element) {
		this._container.prepend(element)
	}
}