import { css,LitElement, html } from 'lit-element';
import '@intcreator/markdown-element';
export class appArtikel extends LitElement {
	static get properties() {
		return {
			src: {type:String},
			_title: {type:String},
			_content: {type:String},
			location: Object
		};
	}
	constructor() {
		super();
		this._content='';
		this._title='';
	}
	render() {
		//language=HTML
		return html`
		<a href="/creator/${this.src}">✏️</a>
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
			padding-right: 100px;
			font-size: 30px;
        }
`
	}

	set src(val) {
		fetch(`/api/getArticle/${val}`).then(response => response.json()).then(response => {
			this._content = response.data;
			this._title = response.title;
		})
	}
}
customElements.define('app-artikel', appArtikel)
