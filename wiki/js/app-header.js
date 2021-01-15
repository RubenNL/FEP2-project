import './app-search.js'
import {css, html, LitElement} from 'lit-element';

class AppHeader extends LitElement {
    constructor() {
        super();
        this._userName = "[studentnaam]";
        this.classList.add('bg-container');
    }

    render() {
        //language=HTML
        return html`
            <a router-link href="/" aria-label="Homepage">
                <img src="/images/logo_100px.webp" alt="" width=100px height=100px>
                <div class="logo-title">
                    <h1>Open ICT - Billy 2.0</h1>
                    <h2>De wiki voor en door HBO-ICT studenten.</h2>
                </div>
            </a>
            <div class="search-container">
                ${window.localStorage.getItem('user') ? 
            //wel ingelogd
            html`<span id="greet">Welkom ${JSON.parse(window.localStorage.getItem('user')).fullName.split(' ')[0]}! <fa-icon @click="${() => {
				document.querySelector("html").classList.toggle("darkMode");
				window.localStorage.setItem('darkMode',document.querySelector('html').classList.contains('darkMode'))
			}}" class="fas fa-adjust" path-prefix="/node_modules"/></fa-icon></span>
                    <a class="button" id="logout" @click="${() => {
                window.localStorage.clear();
                window.location.pathname="/";
            }}">Uitloggen</a>`
            
            : //Niet ingelogd
            
            html`<span id="greet"><fa-icon class="fas fa-adjust"  @click="${() => {
				document.querySelector("html").classList.toggle("darkMode")
				window.localStorage.setItem('darkMode',document.querySelector('html').classList.contains('darkMode'))
			}}" path-prefix="/node_modules"/></fa-icon></span>
			<a router-link href="/login#main" class="button">Inloggen</a>`}
			<app-search id="appsearch"></app-search></div>`
    }

    static get styles() {
        //language=CSS
        return css`
            :host {
                display: flex !important;
                flex-direction: row;
                justify-content: space-between;
                height: 125px;
                background-color: var(--button-blue);
                color: var(--text-color);
                padding: 10px;
                border-radius: 5px;
            }

            a {
                display: flex;
                color: inherit; /* blue colors for links too */
                text-decoration: inherit; /* no underline */
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
                display: flex;
                align-items: flex-end;
                flex-direction: column;
            }

            .search-container > .button {
                background: #0066c4;
                color: var(--text-color);
                cursor: pointer;
                width: 225px;
                border: 0;
                transition: all 0.5s;
                border-radius: 3px;
                text-align: center;
                padding-bottom: 10px;
                padding-top: 5px;
                margin-top:15px;
                text-decoration: inherit; /* no underline */
                align-content: center;
                display: block;
            }
            #appsearch{
                padding-top: 10px;
            }
            
            #greet{
                text-align: center;
                margin-top: 5px;
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
