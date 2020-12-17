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
            <div id="inlogform">
                <input aria-labelledby="name" type="text" name="email" id="name" placeholder="Voer uw email in." @input="${this._change}"/>
                <input aria-labelledby="password" type="password" name="password" id="password" placeholder="Voer uw wachtwoord in." @input="${this._change}"/>
                <button @click="${this._onclick}">login</button>
            </div>
            `
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
                display: flex;
				align-content: left;
            }

            #inlogform {
                text-align: left;
				align-items: left;
            }

            #inlogform > input {
                text-align: left;
                margin-top: 10px;
				margin-bottom: 10px;
                width: 400px;
                display: block;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }
			#inlogform > button {
				text-align: center;
				margin-top: 10px;
				margin-bottom: 10px;
				width: 440px;
				display: block;
				border-radius: 4px;
				padding: 20px;
				border: 1px solid #ccc;
			}`
    }

}

customElements.define('app-inlog', appInlog)
