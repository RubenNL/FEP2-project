import { css,LitElement, html } from 'lit-element';
import '@intcreator/markdown-element';
export class appArtikel extends LitElement {
	static get properties() {
		return {
			src: {type:String},
			_title: {type:String},
			_content: {type:String}
		};
	}
	render() {
		return html`<h1>${this._title}</h1>
		<markdown-element markdown="${this._content}"></markdown-element>`
	}
	set src(val) {
		fetch(`articles/${val}`).then(response => response.json()).then(response => {
			this._content = response.data;
			this._title = response.title;
		})
	}
}
customElements.define('app-artikel', appArtikel)