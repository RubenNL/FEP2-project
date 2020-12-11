import {css, html, LitElement} from "lit-element";
import './app-inlog.js';
import './app-artikel.js';

export class AppContent extends LitElement {
	static get properties() {
		return {
			state: {type:String},
			page: {type:String},
		}
	}
	constructor() {
		super();
		this.state="article";
		this.page="homePageArticle.json";
	}
	static get styles() {
		//language=CSS
		return css`
			[hidden] {
				display:none
			}
		`
	}

	render() {
		//language=HTML
		return html`
			<app-artikel ?hidden="${this.state!="article"}" src="${this.page}"></app-artikel>
			<app-inlog ?hidden="${this.state!="login"}"></app-inlog>`
	}
}

customElements.define('app-content', AppContent)