import {css, LitElement, html} from 'lit-element';
import './app-article-card.js'
export class AppBookmarks extends LitElement {
	static get properties() {
		return {
			_articles: {type: Array},
			location: {type:Object}
		};
	}
	constructor() {
		super();
		this._articles = [];
	}
	onBeforeEnter(location, commands, router) {
        if (!window.localStorage.getItem('JWT')) return commands.redirect('/login');
		else sendAuthenticated(`/api/getBookmarks`).then(response => {
			this._articles=response;
		})
    }
	render() {
		//language=HTML;
		return html`<h2>Bladwijzers</h2>
		<div class="articlecontainer">
			${
				this._articles.length>0
				?this._articles.map((id) => html`<app-article-card id="${id}"/>`)
				:html`U heeft nog geen artikelen opgeslagen.`
			}
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
