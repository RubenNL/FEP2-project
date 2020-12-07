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
:host(:hover) > #links {
    display: block;
}`
	}
	render() {
		return html`
			<input @input="${this._onchange}">
			<div id="links">
			${this._suggestions.length>0?this._suggestions.map(suggestion=>html`<a href="#" @click="${this._openArticle(suggestion.id)}">${suggestion.text}</a><br>`):html`no results found`}
			</div>
		`;
	}
	_onchange(e) {
		this._value=this.shadowRoot.querySelector('input')._value;
		new Promise((resolve,reject)=>{//TODO met een fetch.
			resolve([
				{text:'test',id:'demo'},
				{text:'java',id:123}
			])
		}).then(items=>{
			this._suggestions=items;
		});
	}
	_openArticle(id) {
		return ()=>{
			document.querySelector('app-artikel').src=`${id}.json`;//TODO mischien met event?
		};
	}
}
customElements.define('app-search', AppSearch);
