import './app-search.js'
import {LitElement, html, css} from 'lit-element';

class AppHeader extends LitElement {
	render() {
		//language=HTML
		return html`
			<div class="logo-container">
				<img src="/wiki/images/logo_512px.png" alt="" width=100px height=100px>
				<div class="logo-title">
					<h1>Open ICT Wiki</h1>
					<h2>De wiki voor en door HBO-ICT studenten.</h2></div>					
				</div>
			<div class="search-container">
				<h1>Welkom bij de open ICT wiki, [naam]!</h1>
				<input type="button" value="Uitloggen" >
				<app-search></app-search>
			</div>`;
	}

	static get styles() {
		//language=CSS
		return css`
            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 110px;
                background-color: lightgrey;
                padding: 10px;
                border-radius: 5px;
            }

            .logo-container {
                display: flex;
            }

			.logo-title > *{
				text-align: center;
			}

            .logo-title > h2 {
                font-size: 16px;
				margin-top: 1px;
            }

            .logo-title > h1 {
				margin-bottom: 1px;
                font-size: 19px;
            }
			
			.logo-title{
				display:flex;
				flex-direction: column;
				justify-content: center;
			}

            .search-container {
                background-color: #ff0024;
                align-items: center;
            }

            @media only screen and (max-width: 470px) {
				.logo-title{
					display: none;
				}
            }
		`
	}

}

window.customElements.define('app-header', AppHeader);