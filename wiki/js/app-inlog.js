import {css, LitElement, html} from 'lit-element';

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
            </div>
            <div id="button">    
                <input type="submit" value="Login">
                <label id="registerlink">Nieuwe gebruiker? <a href="/register">Registreer nu!</a></label>
            </div>
            </form>`

    }
    _change(e) {
        this._data[e.target.name]=e.target.value;
    }

    _onclick(e) {
		e.preventDefault();
        fetch('/api/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._data)
        }).then(response=>response.json()).then(response=>{
            if(response.err) alert(response.err)
            else {
                window.localStorage.setItem('JWT', response.key);
                sendAuthenticated('/api/getUser').then(user=>{
                    if(user.blocked) {
                        alert('Uw account is geblokkeerd! Neem contact op als dit niet klopt');
                        window.localStorage.clear()
                    } else window.localStorage.setItem('user', JSON.stringify(user))
                }).then(()=>window.location.pathname='/')
            }

        });
    }

    static get styles() {
        //language=CSS
        return css`
            :host {
                margin: auto;
            }

            #inlogformContainer, #button {
                text-align: left;
                padding-left: 25%;
            }
            #button{
                display: flex;
                align-content: center;
                font-size: 13px;
            }
            #registerlink{
                align-self: flex-end;
                padding-left: 125px;
                margin-top: 1px;
                margin-bottom: 8px;
            }
            #inlogformContainer > label > input {
                text-align: left;
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                width: 400px;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }

            input[type=submit] {
                display: block;
                text-align: center;
                text-decoration: none;
                border: none;
                border-radius: 3px;
                box-sizing: border-box;
                width: unset;
                padding: 7px 35px;
                background-color: #0066c4;
                color: #fff;
                font-size: 14px;
                cursor:pointer;
            }`
    }

}

customElements.define('app-inlog', appInlog)
