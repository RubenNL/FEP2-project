import {css, LitElement, html} from 'lit-element';

export class appRegister extends LitElement {
    static get properties() {
        return {
            _data: {type: Object}
        }
    }

    static get styles() {
        //language=CSS
        return css`
            :host {
                margin: auto;
                width: 200vh;
                height: 60vh;
                display: flex;
				align-content: left;
            }

            #registerform {
                text-align: left;
				align-items: left;
            }

            #registerform > input {
                text-align: left;
                margin-top: 10px;
				margin-bottom: 10px;
                width: 400px;
                display: block;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }
			#registerform > button {
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

    constructor() {
        super();
        this._data = {};
    }

    render() {
        return html`
			<div id="registerform">
				<label>E-mail: </label>
				<input aria-labelledby="email" type="email" name="email" placeholder="Voer uw email in." @input="${this._change}"/>
				<label>Wachtwoord: </label>
				<input aria-labelledby="password" type="password" name="password" placeholder="Voer uw wachtwoord in." @input="${this._change}"/>
				<label>Naam: </label>
				<input aria-labelledby="naam" type="text" name="fullName" placeholder="Voer uw naam in." @input="${this._change}"/>
				<label>Functie: </label>
				<input aria-labelledby="functie" type="text" name="functie" placeholder="Voer uw functie in." @input="${this._change}"/>
				<label>Organisatie: </label>
				<input aria-labelledby="organisatie" type="text" name="orgName" placeholder="Voer uw organisatie in." @input="${this._change}"/>
				<button @click="${this._onclick}">registreren</button>
			</div>`
    }


    _change(e) {
        this._data[e.target.name]=e.target.value;
    }
    _onclick() {
        console.log(this._data);
        fetch('/api/register',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._data)
        }).then(response=>response.json()).then(response=>{
            if(response.err) {
                alert(response.err);
                return;
            }
            alert('Account aangemaakt, log nu in.')
            window.location.pathname="/login"
        });
    }
}

customElements.define('app-register', appRegister)