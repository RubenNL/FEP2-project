import {css, LitElement, html} from 'lit-element';
import '@intcreator/markdown-element';

export class appInlog extends LitElement {
    static get properties() {
        return {
            _data: {type:Object}
        }
    }
    constructor() {
        super();
        this._data={};
    }
    render() {
        //language=HTML
        return html`
            <h2>Inloggen</h2>
            <form id="inlogform" @submit="${this._onclick}">
            <div id="inlogformContainer">
                <label for="name">
                Email:
                <input type="email" name="email" id="name" placeholder="Voer uw email in." @input="${this._change}" required/>
                </label>
                <label for="password">
                Wachtwoord:
                <input type="password" name="password" id="password" placeholder="Voer uw wachtwoord in." @input="${this._change}" required/>
                </label>
                <input type="submit" value="Login" id="submit">
            </div>
            </form>`

    }
    _change(e) {
        this._data[e.target.name]=e.target.value;
    }

    _onclick() {
        fetch('/api/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._data)
        }).then(response=>response.json()).then(response=>{
            if(response.err) alert(response.err)
            else {
                window.localStorage.setItem('JWT',response.key);
				sendAuthenticated('/api/getUser').then(user=>window.localStorage.setItem('user',JSON.stringify(user))).then(()=>window.location.pathname='/');
            }
        });
    }
    static get styles() {
        //language=CSS
        return css`
            :host {
                margin: auto;
                
            }

            #inlogformContainer {
                text-align: left;
                padding-left: 25%;
            }

            #inlogformContainer > label > input {
                text-align: left;
                margin-top: 10px;
                margin-bottom: 10px;
                width: 400px;
                display: block;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }

            #submit {
                width: 200px;
                height: 25px;
            
                display: flex;
                color: inherit; /* blue colors for links too */
                text-decoration: inherit; /* no underline */
                display: inline-block; padding: 5px 15px;
                background: #0066c4;
                color: #ffffff;
                border: 0;
                border-style: solid; border-width: 2px;
                border-color: ButtonHighlight ButtonShadow ButtonShadow ButtonHighlight;
                border-radius: 5px;
            }`
    }

}

customElements.define('app-inlog', appInlog)
