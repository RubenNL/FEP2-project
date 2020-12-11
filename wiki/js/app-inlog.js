import {css, LitElement, html} from 'lit-element';
import '@intcreator/markdown-element';

export class appInlog extends LitElement {
    render() {
        //language=HTML
        return html`
            <form id="inlogform">
                <input aria-labelledby="name" type="text" name="username" id="name"
                       placeholder="Voer uw gebruikersnaam in."/>
                <input aria-labelledby="password" type="password" name="password" id="password"
                       placeholder="Voer uw wachtwoord in."/>
                <input type="button" value="Login!" name="login" id="login-button">
            </form>
            </div>`
    }

    static get styles() {
        //language=CSS
        return css`
            :host {
                margin: auto;
                width: 50vh;
                height: 50vh;
                display: flex;
            }

            #inlogform {
                text-align: center;
            }

            #inlogform > input {
                text-align: center;
                margin-top: 30px;
                width: 80%;
                display: inline-block;
                border-radius: 4px;
                padding: 10px;
                border: 1px solid #ccc;
            }`
    }


}

customElements.define('app-inlog', appInlog)