import {css, LitElement, html} from 'lit-element';
import './app-article-card.js'
export class AppBookmarks extends LitElement {
	static get properties() {
		return {
			_articles: {type: Array},
			location: Object
		};
	}

	constructor() {
		super();
		this._articles = [];
		sendAuthenticated(`/api/getBookmarks`).then(response => response.json()).then(response => {
			this._articles=response.split(',')
		})
	}

	render() {
		//language=HTML;
		return html`<h2>Bookmarks</h2>
		<h3>h3</h3>
		<div class="articlecontainer">
			${this._articles.map((artikel) => html`<app-article-card id="${artikel.id}"></app-article-card>`)}
		</div>`
	}

	static get styles() {
		// language=css
		return css`
            .articlecontainer{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
		`}
}

customElements.define('app-bookmarks', AppBookmarks)
