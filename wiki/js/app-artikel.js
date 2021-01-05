import { css,LitElement, html } from 'lit-element';
import '@intcreator/markdown-element';
import './app-404.js';
export class appArtikel extends LitElement {
	static get properties() {
		return {
			src: {type:String},
			_src: {type:String},
			_title: {type:String},
			_content: {type:String},
			location: Object,
			_404: {type:Boolean}
		};
	}
	constructor() {
		super();
		this._content='';
		this._title='';
		this._404=false;
	}
	render() {
		//language=HTML
		if(this._404) return html`<app-404></app-404>`
		return html`
			${window.localStorage.getItem('user') ? html`<a href="/delete/${this.src}" title="Delete article">🗑️️</a>
		<a href="/creator/${this.src}" title="Edit article">✏️</a>` : html``}

		<h1>${this._title}</h1>
		<markdown-element markdown="${this._content}"></markdown-element>`
	}

	onBeforeEnter(location, commands, router){
		this.src=location.params.article
	}

	static get styles(){
		//language=CSS
		return css`:host > a {
            margin: auto;
            display: flex;
            float: right;
			margin-right: 40px;
			font-size: 30px;
            text-decoration: inherit;
        }
`
	}

	set src(val) {
		this._src=val;
		fetch(`/api/getArticle/${val}`).then(response => response.json()).then(response => {
			this._404=!response;
			this._content = response.data;
			this._title = response.title;
		})
	}
	get src() {
		return this._src;
	}
}
customElements.define('app-artikel', appArtikel)
