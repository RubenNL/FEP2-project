import {css, LitElement, html} from 'lit-element';
import '@intcreator/markdown-element';

export class appInlog extends LitElement {
    static get properties() {
        return {
            _username: {type:String},
            _password: {type:String},
            location: Object
        }
    }
    constructor() {
        super();
        this._username='';
        this._password='';
    }
    render() {
        //language=HTML
        return html`
            <div id="inlogform">
                <input aria-labelledby="name" type="text" name="username" id="name"
                       placeholder="Voer uw gebruikersnaam in." value="${this._username}" @input="${this._changeUsername}"/>
                <input aria-labelledby="password" type="password" name="password" id="password"
                       placeholder="Voer uw wachtwoord in." value="${this._password}" @input="${this._changePassword}"/>
                <button @click="${this._onclick}">login</button>
            </div>
            `
    }

    onBeforeEnter(location, commands, router){
        console.log(location)
        console.log(commands)
        console.log(router)
    }

    _changeUsername(e) {
        this._username=e.target.value;
    }
    _changePassword(e) {
        this._password=e.target.value;
    }
    _onclick() {
        fetch('/api/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:this._username,password:this._password})
        }).then(response=>response.text()).then(response=>alert(response));
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

            #inlogform > input, #inlogform > button {
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