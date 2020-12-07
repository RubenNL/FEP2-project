import {LitElement, html, css} from 'lit-element';

class AppHeader extends LitElement {
	render() {
		//language=HTML
		return html`<h1>Testheader</h1>
		<app-search></app-search>`;
	}

	static get styles() {
		//language=CSS
		return css`* {
            display: inline;
            height: 100px;
            background-color: lightgrey;
            padding: 10px;
            border-radius: 5px;
        }`
	}

}

window.customElements.define('app-header', AppHeader);