import './app-search.js'
import {css, html, LitElement} from 'lit-element';

class AppHeader extends LitElement {
	constructor(){
		super();
		this._userName = "[studentnaam]";
		this.classList.add('bg-container');
	}
	render() {
		//language=HTML
		return html`
			<div class="logo-container">
				<a href="/wiki/index.html"><img src="/wiki/images/logo_512px.png" alt="" width=100px height=100px></a>
				<div class="logo-title">
					<h1>Open ICT - Billy 2.0</h1>
					<h2>De wiki voor en door HBO-ICT studenten.</h2></div>
			</div>
			<div class="search-container">
				<input type="button" value="Registreren">
				<h1>Welkom!</h1>
				<input type="button" value="Inloggen">
				<app-search></app-search>
			</div>`;
	}

	static get styles() {
		//language=CSS
		return css`
            :host {
                display: flex !important;
                flex-direction: row;
                justify-content: space-between;
                height: 125px;
                background-color: lightgrey;
                padding: 10px;
                border-radius: 5px;
            }

            .logo-container {
                display: flex;
            }

            .logo-title > * {
                text-align: left;
            }

            .logo-title > h2 {
                font-size: 16px;
                margin-top: 1px;
            }

            .logo-title > h1 {
                margin-bottom: 1px;
                font-size: 19px;
            }

            .logo-title {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .search-container {
                display: grid;
                align-items: center;
                grid-template-rows: 1fr 1fr 1fr;
            }

            .search-container > h1 {
                grid-column: 2 / 4;
                font-size: 19px;
                align-items: center;
            }

            .search-container > input {
				margin-bottom: 2px;
                background: #0066c4;
                color: #ffffff;
                cursor: pointer;
                border: 0;
				height: 30px;
                width: 100px;
                transition: all 0.5s;
                border-radius: 3px;
                align-self: start;
                grid-column: 1 / 2;
            }

            .search-container > app-search {
                grid-column: 3 / 4;
                height: 30px;
            }

            @media only screen and (max-width: 470px) {
                .logo-title {
                    display: none;
                }
            }
		`
	}
}

window.customElements.define('app-header', AppHeader);