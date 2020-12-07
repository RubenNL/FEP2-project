import { css,LitElement, html } from 'lit-element';
export class AppSearch extends LitElement {
	static get properties() {
		return {
			_value:{type:String},
			_suggestions:{type:Array}
		};
	}
	constructor() {
		super();
		this._suggestions=[]
	}
	render() {
		return html`<input @input="${this._onchange}"><ul>${this._suggestions.map(suggestion=>html`<li article="${suggestion.id}">${suggestion.text}</li>`)}</ul>`
	}
	_onchange(e) {
		this._value=this.shadowRoot.querySelector('input')._value;
		new Promise((resolve,reject)=>{
			resolve([
				{text:'abc',id:123},
				{text:'def',id:456}
			])
		}).then(items=>{
			this._suggestions=items;
		})

		console.log(this._value);
	}
}
customElements.define('app-search', AppSearch)
