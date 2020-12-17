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
		this._suggestions=[];
		this._value='';
	}
	static get styles() {
		//language=css
		return css`
#links {
	display:none;
    border-radius:5px;
    background-color: white;
    position: relative;
    z-index: 1;
    padding: 5px;
    padding-left: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
input:focus + #links, :host(:hover) > #links {
    display: block;
}
h1 {
	margin: 1px;
	font-size: 19px;
}`

	}
	render() {
		return html`
			<h1>Zoeken:</h1>
			<input @input="${this._onchange}">
			<div id="links">
			${this._suggestions.length>0?this._suggestions.map(suggestion=>html`<a router-link href="/article/${suggestion.id}">${suggestion.title}</a><br>`):html`no results found`}
			</div>
		`;
	}
	_onchange(e) {
		this._value=e.target.value;
		const query=this._value;
		fetch(`/api/search?${query}`)
			.then(response=>response.json())
			.then(items=>{
				this._suggestions=items;
			});
	}
	_openArticle(id) {
		return ()=>{
			document.querySelector('app-content').state="article"
			document.querySelector('app-content').page=id;
		}
	}
}
customElements.define('app-search', AppSearch);
