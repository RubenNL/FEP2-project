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
            <a router-link href="/">
                <img src="/images/logo_192px.png" alt="" width=100px height=100px>
                <div class="logo-title">
                    <h1>Open ICT - Billy 2.0</h1>
                    <h2>De wiki voor en door HBO-ICT studenten.</h2>
                </div>
            </a>
            <div class="search-container">
                ${window.localStorage.getItem('user') ? 
            //wel ingelogd.
            html`<span id="greet">Welkom ${JSON.parse(window.localStorage.getItem('user')).fullName.split(' ')[0]}!</span>
                    <a class="button" id="logout" @click="${() => {
                window.localStorage.clear();
                window.location.reload();
            }}">Uitloggen</a>`
            
            : //Niet ingelogd
            
            html`<span id="greet" style="opacity:0">Welkom!</span>
                <a router-link href="/login" class="button">Inloggen</a>`}
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
                background-color: lightgrey;
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
                color: #ffffff;
                cursor: pointer;
                width: 165px;
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
